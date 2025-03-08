import { BadRequestException, Injectable } from "@nestjs/common";

import { S3Service } from "@/external/s3/s3.service";
import type { FileInfo } from "@/types";

@Injectable()
export class UploadService {
    constructor(private readonly s3Service: S3Service) {
        this.s3Service = s3Service;
    }

    async get(fileInfo: FileInfo) {
        // const result = await this.s3Service.upload(fileInfo);
        // if (result?.$metadata.httpStatusCode !== 200)
        //     throw new BadRequestException("파일 업로드에 실패하였습니다.");
        //
        // console.log(fileInfo.size);
        //
        // return result.Key;
    }
}
