import { Injectable } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { type FileInfo, S3Config } from "@/types";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
    private readonly s3: S3Client;
    private readonly bucket: string;

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

    async upload(fileInfo: FileInfo) {
        const parallelUpload = new Upload({
            client: this.s3,
            params: {
                Bucket: this.bucket,
                Key: `temp/${fileInfo.filename}`,
                Body: fileInfo.file,
            },
        });

        parallelUpload.on("httpUploadProgress", (progress) => {
            console.log(progress.loaded + "/" + progress.total);
        });

        return await parallelUpload.done();
    }
}
