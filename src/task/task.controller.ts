import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ITask } from '@src/task/task.interface';
import { TaskService } from '@src/task/task.service';
import { CreateTaskDto } from '@src/task/dto/create-task.dto';
import { UpdateTaskDto } from '@src/task/dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.taskService.getTaskById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() task: CreateTaskDto): ITask {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    return this.taskService.deleteTask(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
