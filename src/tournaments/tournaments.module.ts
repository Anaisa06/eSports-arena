import { forwardRef, Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentPlayers } from './entities/tournament-players.entity';
import { UsersModule } from 'src/users/users.module';
import { MatchesModule } from 'src/matches/matches.module';
import { ResultsModule } from 'src/results/results.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Tournament, TournamentPlayers]), UsersModule, ResultsModule,forwardRef(() => MatchesModule)],
  controllers: [TournamentsController],
  providers: [TournamentsService],
  exports: [TypeOrmModule, TournamentsService]
})
export class TournamentsModule {}
