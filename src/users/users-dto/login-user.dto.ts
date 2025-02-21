import { IsNotEmpty, IsString } from "class-validator";

export class LoginUser {
    @IsNotEmpty()
    @IsString()
    email : string;
    @IsNotEmpty()
    @IsString()
    password : string;
}