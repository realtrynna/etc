import { HttpException, HttpStatus } from "@nestjs/common";
import type { ValidationError } from "class-validator";

export class CustomValidationException extends HttpException {
    constructor(validationErrorList: ValidationError[]) {
        const errorTarget = validationErrorList
            .map((err) => {
                const constrains = err.constraints;

                if (!constrains) return null;

                const constrainsErrorString = Object.keys(constrains).map(
                    (key) => constrains[key],
                );

                return {
                    [err.property]: constrainsErrorString,
                };
            })
            .filter((v) => v)
            .reduce((result, item) => {
                if (!item) return result;
                if (!result) return result;

                Object.assign(result, item);

                return result;
            }, {});

        super(
            {
                error: "Validation Error",
                message: "요청 값 에러",
                validationInfo: errorTarget,
                statusCode: HttpStatus.BAD_REQUEST,
                code: "Validation Error",
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}
