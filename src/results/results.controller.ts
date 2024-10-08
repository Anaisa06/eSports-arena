import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiTags } from '@nestjs/swagger';
import { ResultsQueryDto } from './dto/results-query.dto';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findAllOrFilter(@Query() query: ResultsQueryDto) {
    return this.resultsService.findAllOrFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }
}
