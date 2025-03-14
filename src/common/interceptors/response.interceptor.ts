import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                console.log("data", data);

                return {
                    statusCode: 500,
                    message: "Response common",
                    data,
                };
            }),
        );
    }
}
