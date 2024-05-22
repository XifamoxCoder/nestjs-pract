import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ITask, Status } from '@src/task/task.interface';
import { Task } from '@src/task/task.entity';
import { CreateTaskDto } from '@src/task/dto/create-task.dto';
import { UpdateTaskDto } from '@src/task/dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
    {
      id: 2,
      task: 'Initial Task 2',
      status: Status.CREATED,
      tags: ['tag2'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(@Param('id') id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  createTask({ task, tags, status }: CreateTaskDto): ITask {
    const newTask = new Task(task, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== +id);
    return `Deleted ${id}`;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): ITask {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const existingTask = this.tasks[taskIndex];
    const updatedTask = {
      ...existingTask,
      ...updateTaskDto,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }
}
