import { Injectable } from "@nestjs/common";
import { S3Service } from "@/external/s3/s3.service";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class UploadService {
    constructor(private readonly s3Service: S3Service) {
        this.s3Service = s3Service;
    }

    async get(file: Buffer) {
        const result = await this.s3Service.upload(file);

        console.log(result);
    }
}
