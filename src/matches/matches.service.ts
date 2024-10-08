import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { TournamentPlayers } from 'src/tournaments/entities/tournament-players.entity';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { MatchQueryDto } from './dto/match-query.dto';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { FinishMatchDto } from './dto/finish-match.dto';
import { MatchStates } from 'src/common/enums/match-states.enum';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(TournamentPlayers) private tournamentPlayersRepository: Repository<TournamentPlayers>,
    @Inject(forwardRef(() => TournamentsService))
    private tournamentService: TournamentsService,
  ) {

  }
  async create(tournament: Tournament, players: TournamentPlayers[]) {

    const pairs = this.createPairs(players);

    const newMatches =  pairs.map((pair) => {
      return this.matchRepository.create({ playerOne: pair[0].user, playerTwo: pair[1].user, tournament })
    });

    return await this.matchRepository.save(newMatches);

  }

  private shufflePlayers(players: TournamentPlayers[]) {
    for (let i = players.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [players[i], players[random]] = [players[random], players[i]]
    }

    return players;
  }

  private createPairs(players: TournamentPlayers[]) {

    const shuffledPlayers = this.shufflePlayers(players);

    const pairs: [TournamentPlayers, TournamentPlayers][] = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      pairs.push([shuffledPlayers[i], shuffledPlayers[i + 1]])
    }

    return pairs;
  }

  async findAllOrFilter(queryDto: MatchQueryDto) {

    const query = this.matchRepository.createQueryBuilder('match')
      .leftJoinAndSelect('match.playerOne', 'playerOne')
      .leftJoinAndSelect('match.playerTwo', 'playerTwo')
      .leftJoinAndSelect('match.tournament', 'tournament');


    if (queryDto.playerId) {

      query.andWhere('match.playerTwo = :playerId OR match.playerOne = :playerId', { playerId: queryDto.playerId });
    }

    if (queryDto.tournamentId) {

      query.andWhere('match.tournament = :tournament', { tournament: queryDto.tournamentId })
    }

    const matches = await query.getMany();

    if (!matches.length) throw new NotFoundException('Matches were not found');

    return matches;
  }

  async completeMatch(id: number, points: FinishMatchDto) {
    const match = await this.findOne(id);

    if(match.state === MatchStates.FINISHED) throw new BadRequestException('Match is already finished');

    match.state = MatchStates.FINISHED;
    match.playerOnePoints = points.playerOnePoints;
    match.playerTwoPoints = points.playerTwoPoints;

    const finishedMatch = await this.matchRepository.save(match);

    await this.assignPoints(finishedMatch.id);

    return finishedMatch;
  }

  private async assignPoints(matchId: number) {

    const match = await this.findOne(matchId);

    const playerOneRegister = await this.tournamentPlayersRepository.update(match.playerOne.id, {points: match.playerOnePoints});
    if(!playerOneRegister.affected) throw new NotFoundException('Player one not found in tournament');

    const playerTwoRegister = await this.tournamentPlayersRepository.update(match.playerTwo.id, {points: match.playerTwoPoints});
    if(!playerTwoRegister.affected) throw new NotFoundException('Player not found in tournament');

  }

  async findOne(id: number) {
    const match = await this.matchRepository.findOne({ where: {id}, relations: ['playerOne', 'playerTwo']});
    if(!match) throw new NotFoundException(`Match with id ${id} was not found`);
    return match;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
