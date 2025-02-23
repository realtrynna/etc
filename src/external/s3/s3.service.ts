import { Injectable } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { S3Config } from "@/types";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
    private s3: S3Client;
    private bucket: string;

    constructor(private readonly configService: ConfigService) {
        this.s3 = new S3Client({
            region: configService.get<S3Config>("s3").region,
            credentials: {
                accessKeyId: configService.get<S3Config>("s3").accessKey,
                secretAccessKey:
                    configService.get<S3Config>("s3").secretAccessKey,
            },
        });
        this.bucket = configService.get<S3Config>("s3").bucket;
    }

    async upload(file: Buffer) {
        const parallelUpload = new Upload({
            client: this.s3,
            params: {
                Bucket: "dev-know",
                Key: "temp/here",
                Body: file,
            },
        });

        parallelUpload.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        return await parallelUpload.done();
    }
}
