import { ApiPropertyOptional } from "@nestjs/swagger";

export class MatchQueryDto {
    @ApiPropertyOptional({ name: 'tournamentId', example: 1})
    tournamentId?: number;

    @ApiPropertyOptional({ name: 'playerId', example: 1})
    playerId?: number;
}