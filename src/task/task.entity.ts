import { ITask, Status } from '@src/task/task.interface';

export class Task implements ITask {
  id = new Date().getTime();
  task: string;
  email: string;
  status: Status;
  tags: string[];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(task: string, email?: string, tags?: string[], status?: Status) {
    this.task = task;
    this.tags = tags || [];
    this.status = status || Status.CREATED;
    this.email = email || null;
  }
}
