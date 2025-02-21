import { IsNotEmpty, IsString } from "class-validator";

export class CreateUser {
    id? : number;
    @IsNotEmpty()
    @IsString()
    email : string;
    @IsNotEmpty()
    @IsString()
    password : string;
    @IsNotEmpty()
    @IsString()
    username : string;
}