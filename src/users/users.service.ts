import { Injectable } from '@nestjs/common';
import { CreateUser } from './users-dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
// Es necesario el * //
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

    prisma : PrismaClient = new PrismaClient();

    async register(user : CreateUser){
        const hashedPassword = await bcrypt.hash(user.password,10);
        
        const newUser = await this.prisma.user.create({
            data : {
                email : user.email,
                username : user.username,
                password : hashedPassword
            }
        });
        
        return newUser;
    }
}
