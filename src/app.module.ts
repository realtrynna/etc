import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import applicationConfig from "@/config/application.config";
import { UploadModule } from "@/domains/uploads/upload.module";
import { FileParseMiddleware } from "@/common/middlewares/file-parse.middleware";
import { UsersModule } from "@/domains/users/users.module";
import { DbModule } from "@/db/db.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [applicationConfig],
        }),
        DbModule,
        UsersModule,
        UploadModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(FileParseMiddleware).forRoutes("/upload");
    }
}
