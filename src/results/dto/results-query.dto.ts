import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";


export class ResultsQueryDto {
    @ApiPropertyOptional({ name: 'userId', example: 1})
    @IsOptional()
    userId: number;

    @ApiPropertyOptional({ name:'tournamentId', example: 1})
    @IsOptional()
    tournamentId: number;
}