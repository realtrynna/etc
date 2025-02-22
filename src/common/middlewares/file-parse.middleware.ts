import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as Busboy from "busboy";

@Injectable()
export class FileParseMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const bb = Busboy({ headers: req.headers });

        const files = [];

        bb.on("file", (name, file, info) => {
            file.on("data", (data) => files.push(data));
            file.on("end", () => {
                req.files = Buffer.concat(files);
                return next();
            });
        });

        req.pipe(bb);
    }
}
