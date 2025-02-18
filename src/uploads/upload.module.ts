import { Module } from "@nestjs/common";
import { UploadController } from "@/uploads/upload.controller";

@Module({
    controllers: [UploadController],
})
export class UploadModule {}
