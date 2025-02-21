import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTask {
    id? : number;
    @IsNotEmpty()
    @IsString()
    @MaxLength(191)
    title : string;
    @IsNotEmpty()
    @IsString()
    @MaxLength(191)
    description : string;
    @IsNotEmpty()
    @IsBoolean()
    done : boolean;
}