import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateMatchDto {
    @ApiProperty({ name: 'tournamentId', example: 1})
    @IsNumber()
    tournamentId: number;



}
