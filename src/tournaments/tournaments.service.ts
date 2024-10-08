import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentPlayers } from './entities/tournament-players.entity';
import { UsersService } from 'src/users/users.service';
import { AddPlayerDto } from './dto/add-player.dto';
import { MatchesService } from 'src/matches/matches.service';
import { MatchStates } from 'src/common/enums/match-states.enum';
import { ResultsService } from 'src/results/results.service';


@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament) private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(TournamentPlayers) private tournamentPlayersRepository: Repository<TournamentPlayers>,
    private usersService: UsersService,
    private matchesService: MatchesService,
    private resultsService: ResultsService,
  ){}

  async create(createTournamentDto: CreateTournamentDto) {

    const newTournament = this.tournamentsRepository.create(createTournamentDto);
    
    return await this.tournamentsRepository.save(newTournament);
  }

  async findAll() {
    const tournaments = await this.tournamentsRepository.find();
    if(!tournaments.length) throw new NotFoundException('No tournaments were found');
    return tournaments;
  }

  async findOne(id: number) {
    const tournament = await this.tournamentsRepository.findOne({ where: {id}, relations: ['players']});
    if(!tournament) throw new NotFoundException(`Tournament with id ${id} was not found`);
    return tournament;
  }

  async addPlayer(id: number, addPlayerDto: AddPlayerDto) {
    const tournament = await this.findOne(id);
    const user = await this.usersService.findOneById(addPlayerDto.userId);

    const existingPlayer = await this.tournamentPlayersRepository.findOne({ where: {user, tournament}});

    if(existingPlayer) throw new ConflictException(`User with id ${addPlayerDto.userId} is already registered in the tournament ${tournament.name}`);

    const newTournamentPlayer = this.tournamentPlayersRepository.create({tournament, user});

    return await this.tournamentPlayersRepository.save(newTournamentPlayer);
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    const { affected } = await this.tournamentsRepository.update(id, updateTournamentDto);

    if(!affected) throw new NotFoundException(`Tournament with id ${id} was not found`);

    return await this.findOne(id);
  }

  async remove(id: number) {

    const tournament = await this.findOne(id);

    await this.tournamentsRepository.softDelete(id);

    return tournament;    
  }

  async getPlayers(id: number) {
    const tournament = await this.findOne(id);
    const players = await this.tournamentPlayersRepository.find({ where: { tournament }, relations: ['user']});
    return players;
  }

  async startTournament(id: number) {
    const tournament = await this.findOne(id);
     
    if(tournament.state === MatchStates.PROGRESS) throw new BadRequestException(`Tournament ${tournament.name} has already started`);

    const players = await this.getPlayers(id);

    if(players.length%2 !== 0) throw new BadRequestException('The number of players must be even');

    const matches = await this.matchesService.create(tournament, players);

    tournament.state = MatchStates.PROGRESS;
    await this.tournamentsRepository.save(tournament);

    return matches;
  }

  async finishTournament(id: number) {
    const tournament = await this.findOne(id);

    if(tournament.state === MatchStates.FINISHED) throw new BadRequestException(`Tournament ${tournament.name} has already finished`)

    const matches = await this.matchesService.findAllOrFilter({ tournamentId: tournament.id });
    const unresolvedMatches = matches.find(match => match.state !== MatchStates.FINISHED);

    if(unresolvedMatches) throw new BadRequestException('All matches must be finished');

    
    const players = await this.tournamentPlayersRepository.find({ where: {tournament}, relations:  ['user']});
    
    tournament.state = MatchStates.FINISHED;
    await this.tournamentsRepository.save(tournament);

    const winner = players.reduce((accum, player) => player.points > accum.points ? player : accum);
    const winnerUser = await this.usersService.findOneById(winner.user.id); 

    return await this.resultsService.create(winnerUser, tournament);
  }

}
