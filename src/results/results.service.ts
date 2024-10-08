import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { ResultsQueryDto } from './dto/results-query.dto';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { MatchStates } from 'src/common/enums/match-states.enum';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result) private resultsRepository: Repository<Result>,
    @Inject(forwardRef(() => TournamentsService))
    private tournamentService: TournamentsService
  ){}

  async create(user: User, tournament: Tournament) {
    const winner = this.resultsRepository.create({winner: user, tournament});

    return await this.resultsRepository.save(winner);
  } 

  async findAllOrFilter(queryDto: ResultsQueryDto) {
    const query = this.resultsRepository.createQueryBuilder('result')
    .leftJoinAndSelect('result.tournament', 'tournament')
    .leftJoinAndSelect('result.winner', 'winner')


    if(queryDto.tournamentId) {
      const tournament = await this.tournamentService.findOne(queryDto.tournamentId);
      if(tournament.state !== MatchStates.FINISHED) throw new BadRequestException('Tournament has not finished yet');
      query.andWhere('result.tournament = :tournament', { tournament: tournament.id});
    }

    if(queryDto.userId) {
      query.andWhere('results.winner = :winner', {winner: queryDto.userId})
    }

    const results = await query.getMany();
    return results;
  } 

  async findOne(id: number) {
    const result = await this.resultsRepository.findOne({where: {id}})
    if(!result) throw new NotFoundException('Result not found');
    return result;
  }

}
