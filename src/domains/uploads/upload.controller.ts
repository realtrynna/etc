import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { UploadService } from "@/domains/uploads/upload.service";


@Controller()
export class UploadController {
    private uploadService: UploadService;

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Post("upload")
    async hello(@Req() req) {
        const prisma = new PrismaClient();

        console.log(prisma)

        const result = await this.uploadService.get(req.file);
        return result;
    }
}
