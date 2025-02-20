import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as Busboy from "busboy";

@Injectable()
export class FileParseMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const bb = Busboy({ headers: req.headers });

        bb.on("file", (name, file, info) => {
            file.on("data", (data) => {
                console.log("data", data);
            });
        });

        return next();
    }
}
