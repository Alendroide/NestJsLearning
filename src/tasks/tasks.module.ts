import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [JwtModule.registerAsync({
    imports : [ConfigModule],
    inject : [ConfigService],
    useFactory : async(configService : ConfigService) => ({
      secret : configService.get<string>("JWT")
    })
  }),ConfigModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
