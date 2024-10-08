import { forwardRef, Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { TournamentPlayers } from 'src/tournaments/entities/tournament-players.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, TournamentPlayers]), forwardRef(() => TournamentsModule)],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [TypeOrmModule, MatchesService]
})
export class MatchesModule {}
