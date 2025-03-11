import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@/domains/users/dto/create-user.dto";

@Injectable()
export class UsersService {
    async createUser(createUserDto: CreateUserDto) {}
}
