import { Controller, Get } from "@nestjs/common";

@Controller()
export class UploadController {
    @Get("hello")
    async hello() {
        console.log("here");
    }
}
