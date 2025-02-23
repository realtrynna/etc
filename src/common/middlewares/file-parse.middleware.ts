import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import * as Busboy from "busboy";

@Injectable()
export class FileParseMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const bb = Busboy({ headers: req.headers });

        const fileChunkList = [];

        bb.on("file", (name, file, info) => {
            file.on("data", (data) => fileChunkList.push(data));
            file.on("end", () => {
                req.file = Buffer.concat(fileChunkList);
                return next();
            });
        });

        req.pipe(bb);
    }
}
