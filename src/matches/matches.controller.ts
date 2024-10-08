import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';
import { MatchQueryDto } from './dto/match-query.dto';
import { FinishMatchDto } from './dto/finish-match.dto';
import { PrivateService } from 'src/auth/decorators/auth.decorator';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @PrivateService()
  @Get()
  findAllOrFilter(@Query() query: MatchQueryDto) {
    return this.matchesService.findAllOrFilter(query);
  }

  @PrivateService()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @PrivateService()
  @Patch('finish/:id')
  finishMatch(@Param('id') id: string, @Body() finishMatchDto: FinishMatchDto) {
    return this.matchesService.completeMatch(+id, finishMatchDto)
  }

}
