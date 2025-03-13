class ErrorCodeVo {
    readonly status: number;
    readonly message: string;

    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

export type ErrorCode = ErrorCodeVo;
export const CONTROLLER_EXCEPTION = new ErrorCodeVo(600, "컨트롤러 예외");
