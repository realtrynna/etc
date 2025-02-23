import { Module } from "@nestjs/common";

import { UploadController } from "@/uploads/upload.controller";
import { UploadService } from "@/uploads/upload.service";
import { S3Service } from "@/external/s3/s3.service";

@Module({
    controllers: [UploadController],
    providers: [UploadService, S3Service],
})
export class UploadModule {}
