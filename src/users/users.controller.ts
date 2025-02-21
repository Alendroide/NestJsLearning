import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './users-dto/create-user.dto';
import { UsersService } from './users.service';

@Controller({})
export class UsersController {

    constructor(private usersService : UsersService){}

    @Post('/register')
    register(@Body() user : CreateUser){
        return this.usersService.register(user);
    }
}
