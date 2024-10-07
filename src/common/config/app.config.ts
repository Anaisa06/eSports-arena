import { INestApplication } from "@nestjs/common";
import { HttpExceptionFilter } from "../filters/exception.filter";

export const appConfig = (app: INestApplication<any>) => {
    app.useGlobalFilters(new HttpExceptionFilter());
}