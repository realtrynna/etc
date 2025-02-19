import { Module } from "@nestjs/common";
import { UploadController } from "@/uploads/upload.controller";
import { UploadService } from "@/uploads/upload.service";

@Module({
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}
