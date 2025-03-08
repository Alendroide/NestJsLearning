import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTask } from './tasks-dto/create-task.dto';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {

    prisma : PrismaClient = new PrismaClient();
    configService : ConfigService = new ConfigService;

    async getAll(page = 1, title? : string, done? : string){
        
        //Esto añade dinamicamente las condiciones de haberlas
        const conditions : { [key: string]: any } = {};
        if(done !== undefined) conditions["done"] = done;
        if(title !== undefined && title !== "") conditions["title"] = { contains : title};
        
        //Define cuántas tasks se van a saltar dependiendo la página
        const skip = (page-1) * 10;
        const tasks = await this.prisma.task.findMany({
            take : parseInt(this.configService.get<string>("TAKESKIP") as string),
            skip,
            orderBy : {
                id : "desc"
            },
            where : conditions
        });
        return tasks;
    }

    async getById(id : number){
        const task = await this.prisma.task.findUnique({ where : { id } });
        if(!task) return new HttpException("Task not found",HttpStatus.NOT_FOUND);
        return task;
    }

    async create(task : CreateTask){
        const newTask = await this.prisma.task.create({
            data : task
        })
        return newTask;
    }

    async update(id : number,task : CreateTask){
        const updatedTask = await this.prisma.task.update({
            data : task,
            where : {
                id
            }
        })
        return updatedTask;
    }

    async destroy(id : number){
        const tskToDestroy = await this.prisma.task.findUnique( { where : {id:id} });
        if(!tskToDestroy) return new HttpException("Task not found",HttpStatus.NOT_FOUND)
        await this.prisma.task.delete({
            where : {
                id
            }
        });
        return { msg: "Task deleted successfully" };
    }

}
