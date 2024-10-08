import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class FinishMatchDto {
    @ApiProperty({ name: 'playerOnePoints', example: 10})
    @IsNumber()
    playerOnePoints: number;

    @ApiProperty({ name: 'playerTwoPoints', example: 8})
    @IsNumber()
    playerTwoPoints: number;
}