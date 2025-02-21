import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService : JwtService, private configService : ConfigService){}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.headers["authorization"]?.split(" ")[1] || undefined;
    
    if(!token) return false;

    try{
      this.jwtService.verify(token,{secret : this.configService.get<string>("JWT")} as JwtVerifyOptions);
      return true;
    }
    catch (error){
      return false;
    }
  }
}