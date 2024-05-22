import { Status } from '@src/task/task.interface';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Название обязательно' })
  @IsNotEmpty({ message: 'Название обязательно' })
  task: string;

  @ArrayNotEmpty({ message: 'Необходимо указать теги' })
  @IsString({ each: true, message: 'Теги должны быть строкой' })
  tags?: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'Не верный тип статуса' })
  status?: Status;
}
