import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CustomValidationException } from "@/common/exceptions/custom-validation.exception";
import type { ValidationError } from "class-validator";
import { HttpExceptionFilter } from "@/common/exceptions/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors: ValidationError[]) =>
                new CustomValidationException(errors),
        }),
    );

    await app.listen(3000);
}
bootstrap();
