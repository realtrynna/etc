import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import type { Request, Response } from "express";

import { ServiceException } from "@/common/exceptions/service.exception";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: ServiceException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.errorCode?.status || 500;

        console.log("예외 ", exception instanceof ServiceException);

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            path: request.url,
        });
    }
}
