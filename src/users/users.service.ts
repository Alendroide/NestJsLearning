import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from './users-dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
// Es necesario el * //
import * as bcrypt from 'bcrypt';
import { LoginUser } from './users-dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {

    private prisma : PrismaClient = new PrismaClient();
    private readonly jwtService : JwtService = new JwtService();
    private configService : ConfigService = new ConfigService();

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

    async login(user : LoginUser){
        const { email, password } = user;
        const foundUser = await this.prisma.user.findUnique({
            where : {
                email
            }
        })
        if(!foundUser) return new HttpException("User not found",HttpStatus.NOT_FOUND);
        const verified = await bcrypt.compare(password,foundUser.password);
        if(!verified) return new HttpException("Wrong password",HttpStatus.FORBIDDEN);

        //Token signing
        const token = this.jwtService.sign({
            id : foundUser.id,
            email : foundUser.email,
            username : foundUser.username
        },{ secret :  this.configService.get<string>("JWT") } as JwtSignOptions);

        return {token};
    }

    async verify(token : string) : Promise<boolean>{
        try{
            await this.jwtService.verify(token,{ secret :  this.configService.get<string>("JWT") } as JwtSignOptions);
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
}
