import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "@/domains/users/dto/create-user.dto";
import { DbService } from "@/db/db.service";

@Injectable()
export class UsersService {
    constructor(private readonly dbService: DbService) {}

    async createUser(createUserDto: CreateUserDto) {}
}
