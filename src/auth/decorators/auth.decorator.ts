import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/roles.enum";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export function PrivateService(role?: Role) {
    return applyDecorators(
        SetMetadata('role', role),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiBearerAuth('access-token')
    )
}