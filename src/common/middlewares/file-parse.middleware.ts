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
            file.resume();
            res.text();

            file.on("data", (data) => {
                // console.log("파싱 중     ", info.mimeType);
                fileChunkList.push(data);
            });
            file.on("end", () => {
                fileInfo.filename = info.filename;
                fileInfo.file = Buffer.concat(fileChunkList);
                fileInfo.mimeType = info.mimeType;

                req.file = fileInfo;
                return next();
            });
            file.on("error", (err) => {
                console.log("error occurred", err);
            });
        });

        req.pipe(bb);
    }
}
