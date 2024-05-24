export enum Status {
  CREATED = 'created',
  PROCESSING = 'processing',
  ABORTED = 'aborted',
  ERROR = 'error',
  DONE = 'done',
}

export interface ITask {
  id: number;
  task: string;
  status?: Status;
  tags?: string[];
  email?: string;
  createdAt: Date;
  updatedAt: Date | string | number;
}
