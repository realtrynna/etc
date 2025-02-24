import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UploadService } from "@/uploads/upload.service";

@Controller()
export class UploadController {
    private uploadService: UploadService;

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Post("upload")
    async hello(@Req() req) {
        const result = await this.uploadService.get(req.file);
        return result;
    }
}
