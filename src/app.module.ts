import { Module } from "@nestjs/common";

import { UploadModule } from "@/uploads/upload.module";

@Module({
    imports: [UploadModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
