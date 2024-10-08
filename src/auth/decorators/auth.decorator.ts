import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/roles.enum";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";
import { ApiKeyGuard } from "../guards/x-api-key.guard";

export function PrivateService(role?: Role) {
    return applyDecorators(
        SetMetadata('role', role),
        UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard),
        ApiBearerAuth('access-token'),
        ApiSecurity('x-api-key')
    )
}