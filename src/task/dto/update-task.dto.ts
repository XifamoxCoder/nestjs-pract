import { Status } from '@src/task/task.interface';
import {
  ArrayNotEmpty,
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название обязательно' })
  @IsNotEmpty({ message: 'Название обязательно' })
  task: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @ArrayNotEmpty({ message: 'Необходимо указать теги' })
  @IsString({ each: true, message: 'Теги должны быть строкой' })
  tags?: string[];

  @IsDate()
  updatedAt: Date;

  @IsEmpty()
  emptyCheck: any;
}
