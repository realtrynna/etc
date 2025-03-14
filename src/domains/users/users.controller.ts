import { BadRequestException, Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "@/domains/users/dto/create-user.dto";
import { ControllerException } from "@/common/exceptions/service.exception";

@Controller("users")
export class UsersController {
    @Post()
    async createUser(@Body() createUserDto) {
        // throw ControllerException("예외 발생");
        return "controller response data";
    }
}
