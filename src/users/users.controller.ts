import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUser } from './users-dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUser } from './users-dto/login-user.dto';
import { Request } from 'express';

@Controller({})
export class UsersController {

    constructor(private usersService : UsersService){}

    @Post('/register')
    register(@Body() user : CreateUser){
        return this.usersService.register(user);
    }

    @Post('/login')
    login(@Body() user : LoginUser){
        return this.usersService.login(user);
    }

    @Post('/verify')
    async verify(@Req() req : Request) : Promise<boolean> {
        const token : string | undefined = req.headers["authorization"]?.split(" ")[1];
        if(!token) return false;
        return this.usersService.verify(token);
    }
}
