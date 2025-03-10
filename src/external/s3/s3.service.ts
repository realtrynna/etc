import { Injectable } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import type { S3Config } from "@/types";
import { Upload } from "@aws-sdk/lib-storage";

@Injectable()
export class S3Service {
    private readonly s3;
    private readonly bucket: string;

    constructor(private readonly configService: ConfigService) {
        const s3Config = configService.get<S3Config>("s3");

        const client = new S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKey,
                secretAccessKey: s3Config.secretAccessKey,
            },
        });
    }

    async upload(fileInfo) {
        const parallelUpload = new Upload({
            client: this.s3,
            params: {
                Bucket: this.bucket,
                Key: `temp/${fileInfo.filename}`,
                Body: fileInfo.file,
            },
        });

        parallelUpload.on("httpUploadProgress", (progress) => {
            console.log(progress.loaded + "/" + progress.total / 1_000);
        });

        return await parallelUpload.done();
    }
}
