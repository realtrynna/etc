import { PrismaClient } from "@prisma/client";

import BaseRepository from "@/repositories/base.repository";
import { User } from "@prisma/client";

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super(new PrismaClient(), "user");
    }
}
