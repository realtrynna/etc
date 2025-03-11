import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "@/domains/users/dto/create-user.dto";

@Controller("users")
export class UsersController {
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
    }
}
