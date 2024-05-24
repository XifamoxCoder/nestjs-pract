import { Status } from '@src/task/task.interface';
import {
  ArrayNotEmpty,
  IsEmail,
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

  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;
}
