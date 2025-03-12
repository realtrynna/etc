import { Module } from "@nestjs/common";
import { UsersController } from "@/domains/users/users.controller";
import { UsersService } from "@/domains/users/users.service";
import { DbModule } from "@/db/db.module";

@Module({
    imports: [DbModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
