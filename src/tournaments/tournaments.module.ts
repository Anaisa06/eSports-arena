import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentPlayers } from './entities/tournament-players.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Tournament, TournamentPlayers]), UsersModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
