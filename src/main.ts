import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CustomValidationException } from "@/common/exceptions/custom-validation.exception";
import type { ValidationError } from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
