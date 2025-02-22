import { Controller, Get, Post, Req } from "@nestjs/common";
import { UploadService } from "@/uploads/upload.service";

@Controller()
export class UploadController {
    private uploadService: UploadService;

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Post("upload")
    async hello(@Req() req) {
        console.log("컨트롤러 진입", req.files);
        return "hello";
    }
}
