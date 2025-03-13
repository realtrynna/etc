import {
    CONTROLLER_EXCEPTION,
    ErrorCode,
} from "@/common/exceptions/error-code";

export const ControllerException = (message) => {
    return new ServiceException(CONTROLLER_EXCEPTION);
};

export class ServiceException extends Error {
    readonly errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, message?: string) {
        if (!message) {
            message = errorCode.message;
        }

        super(message);

        this.errorCode = errorCode;
    }
}
