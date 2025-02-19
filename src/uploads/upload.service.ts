import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpConfig } from "@/types";

@Injectable()
export class UploadService {
    constructor(private configService: ConfigService) {}

    async get() {
        const result = this.configService.get<HttpConfig>("http");
    }
}
