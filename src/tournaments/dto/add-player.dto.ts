import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddPlayerDto {
    @ApiProperty({ name: 'userId', example: 1})
    @IsNumber()
    userId: number;
}