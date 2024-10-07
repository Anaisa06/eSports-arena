import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
    @ApiProperty({ name: 'name', example: 'League of Legends 2024'})
    @IsString()
    name: string;

    @ApiProperty({ name: 'date', example: '2024-11-25'})
    @Transform(({value}) => value ? new Date(value): null)
    @IsDate()
    date: Date;

}
