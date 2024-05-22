import { Module } from '@nestjs/common';
import { TaskController } from '@src/task/task.controller';
import { TaskService } from '@src/task/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
