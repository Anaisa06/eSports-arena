import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfig from './common/config/db.config';
import { InterceptorsModule } from './common/interceptors/interceptor.module';
import { ResultsModule } from './results/results.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: DatabaseConfig,
  }),
    InterceptorsModule,
    AuthModule, 
    MatchesModule,
    ResultsModule, 
    TournamentsModule, 
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
