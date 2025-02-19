import { Controller, Get } from "@nestjs/common";
import { UploadService } from "@/uploads/upload.service";

@Controller()
export class UploadController {
    private uploadService: UploadService;

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Get("hello")
    async hello() {
        await this.uploadService.get();
    }
}
