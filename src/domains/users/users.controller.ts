import { Body, Controller, Post } from "@nestjs/common";

@Controller("users")
export class UsersController {
    @Post()
    async createUser(@Body() createUserDto) {
        console.log(createUserDto);
    }
}
