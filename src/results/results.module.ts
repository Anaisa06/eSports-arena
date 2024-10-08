import { forwardRef, Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), forwardRef(() => TournamentsModule) ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule, ResultsService]
})
export class ResultsModule {}
