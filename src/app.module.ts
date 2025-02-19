import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import applicationConfig from "@/config/application.config";
import { UploadModule } from "@/uploads/upload.module";

@Module({
    imports: [
        UploadModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [applicationConfig],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
