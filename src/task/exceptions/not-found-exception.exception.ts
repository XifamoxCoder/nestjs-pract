import { HttpException, HttpStatus } from '@nestjs/common';

interface IError {
  message?: never;
  error?: never;
  createdAt?: never;
  [k: string]: string;
}

export class NotFoundTaskException extends HttpException {
  constructor(error: IError = null) {
    super(
      {
        message: 'Task not Found',
        error: 'not_found_task_exception',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
