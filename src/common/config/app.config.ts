import { INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "../filters/exception.filter";

export const appConfig = (app: INestApplication<any>) => {
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
}