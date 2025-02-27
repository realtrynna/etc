import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from "@nestjs/common";
import type { NextFunction } from "express";
import * as Busboy from "busboy";

const allowVideoMimeTypeList = ["video/x-m4v", "video/mp4"];

@Injectable()
export class FileParseMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const uploadType = req.query.uploadType;
        const bb = Busboy({ headers: req.headers });

        const fileChunkList = [];
        const fileInfo = {
            filename: null,
            mimeType: null,
            file: null,
            size: 0,
        };

        bb.on("file", (_, file, { filename, mimeType }) => {
            file.on("data", (data) => {
                if (
                    uploadType !== "video" ||
                    !allowVideoMimeTypeList.includes(mimeType)
                ) {
                    throw new BadRequestException(
                        `요청 경로 또는 ${mimeType} 형식의 파일은 업로드할 수 없습니다.`,
                    );
                }

                fileChunkList.push(data);
                fileInfo.size += data.length;
            });
            file.on("end", () => {
                fileInfo.filename = filename;
                fileInfo.file = Buffer.concat(fileChunkList);
                fileInfo.mimeType = mimeType;

                req.file = fileInfo.size;
                return next();
            });
            file.on("error", (err) => {
                console.log("error occurred", err);
            });
        });

        req.pipe(bb);
    }
}
