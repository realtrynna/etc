import { Body, Controller, Get, Post, Req } from "@nestjs/common";

import { UploadService } from "@/domains/uploads/upload.service";

@Controller()
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Post("upload")
    async hello(@Req() req) {
        const result = await this.uploadService.get(req.file);
        return result;
    }
}
