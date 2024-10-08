import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class ApiKeyGuard implements CanActivate {
    constructor(
        private configService: ConfigService

    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const apiKey = request.headers['x-api-key']; 
  
      if (!apiKey) {
        throw new UnauthorizedException('X-API-KEY is required');
      }
  
      const appApiKey = this.configService.get<String>('X_API_KEY')
      if (apiKey !== appApiKey) {
        throw new UnauthorizedException('Invalid X API Key.');
      }
  
      return true;
    }
  }