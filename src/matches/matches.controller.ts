import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';
import { MatchQueryDto } from './dto/match-query.dto';
import { FinishMatchDto } from './dto/finish-match.dto';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAllOrFilter(@Query() query: MatchQueryDto) {
    return this.matchesService.findAllOrFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @Patch('finish/:id')
  finishMatch(@Param('id') id: string, @Body() finishMatchDto: FinishMatchDto) {
    return this.matchesService.completeMatch(+id, finishMatchDto)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
  //   return this.matchesService.update(+id, updateMatchDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.matchesService.remove(+id);
  // }
}
