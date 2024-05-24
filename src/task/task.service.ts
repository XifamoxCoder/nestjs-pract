import {
  BadRequestException,
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
import { NotFoundTaskException } from '@src/task/exceptions/not-found-exception.exception';

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

  getTaskById(@Param('id') id: number): ITask {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundTaskException({ code: 'error' });
    }

    return task;
  }

  createTask({ task, email, tags, status }: CreateTaskDto): ITask {
    const newTask = new Task(task, email, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: number): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return `Deleted ${id}`;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): ITask {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
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

  getTasksByEmail(email: string): ITask[] {
    const tasks = this.tasks.filter((task) => task.email === email);
    if (!tasks || tasks.length === 0) {
      throw new BadRequestException('No tasks found.');
    }
    return tasks;
  }
}
