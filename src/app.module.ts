import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfig from './common/config/db.config';
import { InterceptorsModule } from './common/interceptors/interceptor.module';

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
    UsersModule, 
    AuthModule, 
    TournamentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
