import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from './dto/add-player.dto';
import { PrivateService } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @PrivateService()
  @Post('new-player/:id')
  addPlayer(@Param('id') id: string, @Body() addPlayerDto: AddPlayerDto) {
    return this.tournamentsService.addPlayer(+id, addPlayerDto)
  }

  @PrivateService(Role.ADMIN)
  @Post('start/:id')
  startTournament(@Param('id') id: string) {
    return this.tournamentsService.startTournament(+id);
  }

  @PrivateService(Role.ADMIN)
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @PrivateService(Role.ADMIN)
  @Patch('finish/:id')
  finishTournament(@Param('id') id:string) {
    return this.tournamentsService.finishTournament(+id)
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @PrivateService(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @PrivateService(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }
}
