import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from "@nestjs/common";
import { CustomValidationException } from "@/common/exceptions/custom-validation.exception";

@Catch()
export class Filter implements ExceptionFilter {
    async catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        let statusCode;
        let error;

        if (exception instanceof CustomValidationException) {
            const getError = exception.getResponse();
            const objError = getError;

            error = { getError };
        }

        return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
}
