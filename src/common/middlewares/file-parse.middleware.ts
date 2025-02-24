import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction } from "express";
import * as Busboy from "busboy";

@Injectable()
export class FileParseMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const bb = Busboy({ headers: req.headers });

        const fileChunkList = [];
        const fileInfo = {
            filename: null,
            mimeType: null,
            file: null,
        };

        bb.on("file", (name, file, info) => {
            file.on("data", (data) => fileChunkList.push(data));
            file.on("end", () => {
                fileInfo.filename = info.filename;
                fileInfo.file = Buffer.concat(fileChunkList);
                fileInfo.mimeType = info.mimeType;

                req.file = fileInfo;
                return next();
            });
        });

        req.pipe(bb);
    }
}
