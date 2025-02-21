import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './tasks-dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {

    private tasksService;

    constructor(){
        this.tasksService = new TasksService();
    }

    @Get()
    @UseGuards(AuthGuard)
    index(@Query('page') queryPage ){
        if(!queryPage) return this.tasksService.getAll();
        const page = parseInt(queryPage);
        if(isNaN(page)) return new HttpException("Invalid query",HttpStatus.BAD_REQUEST);
        if(page < 0) return new HttpException("Query must be a positive number",HttpStatus.BAD_REQUEST);
        return this.tasksService.getAll(page);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getById(@Param('id', ParseIntPipe) id : number){
        return this.tasksService.getById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    create(@Body() task : CreateTask){
        return this.tasksService.create(task)
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    update(@Param('id',ParseIntPipe) id : number, @Body() task : CreateTask ){
        return this.tasksService.update(id,task);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    delete(@Param('id',ParseIntPipe) id : number){
        return this.tasksService.destroy(id);
    }
}

