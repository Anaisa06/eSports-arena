import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { TournamentPlayers } from './entities/tournament-players.entity';
import { UsersService } from 'src/users/users.service';
import { AddPlayerDto } from './dto/add-player.dto';


@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament) private tournamentsRepository: Repository<Tournament>,
    @InjectRepository(TournamentPlayers) private tournamentPlayersRepository: Repository<TournamentPlayers>,
    private usersService: UsersService,
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
    const tournament = await this.tournamentsRepository.findOne({ where: {id}});
    if(!tournament) throw new NotFoundException(`Tournament with id ${id} was not found`);
    return tournament;
  }

  async addPlayer(id: number, addPlayerDto: AddPlayerDto) {
    const tournament = await this.findOne(id);
    const user = await this.usersService.findOneById(addPlayerDto.userId);

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
}
