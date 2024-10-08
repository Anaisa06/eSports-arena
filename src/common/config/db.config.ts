import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { ConfigService } from '@nestjs/config';
import { TournamentPlayers } from "src/tournaments/entities/tournament-players.entity";
import { Result } from "src/results/entities/result.entity";
import { Match } from "src/matches/entities/match.entity";

@Injectable()
export default class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, Tournament, TournamentPlayers, Result, Match],
      synchronize: true,
    };
  }
}