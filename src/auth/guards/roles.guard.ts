import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Role } from "src/common/enums/roles.enum";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext) {

        const requiredRole = this.reflector.get<Role>('role', context.getHandler());
        console.log(requiredRole)

        if(!requiredRole) return true;

        const request: Request = context.switchToHttp().getRequest();
        const userPayload = request.user as IJwtPayload;

        if(userPayload.role !== requiredRole) throw new ForbiddenException('You are forbidden for this action');

        return true;
      }
}