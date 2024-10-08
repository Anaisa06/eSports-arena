import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiTags } from '@nestjs/swagger';
import { ResultsQueryDto } from './dto/results-query.dto';
import { PrivateService } from 'src/auth/decorators/auth.decorator';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @PrivateService()
  @Get()
  findAllOrFilter(@Query() query: ResultsQueryDto) {
    return this.resultsService.findAllOrFilter(query);
  }

  @PrivateService()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }
}
