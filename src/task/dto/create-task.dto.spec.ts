import { CreateTaskDto } from '@src/task/dto/create-task.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Status } from '@src/task/task.interface';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    };
  });
  it('task empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('task')).toBeTruthy();
  });
  it('task is not empty', async () => {
    dto.task = 'text';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('task')).toBeFalsy();
  });
  it('tags empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });
  it('tags elements is not string', async () => {
    dto.tags = ['text', 1];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every((el) => typeof el === 'string')).not.toBeTruthy();
  });
  it('tags elements is string and array is not empty', async () => {
    dto.tags = ['text', '1'];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeFalsy();
  });
  it('Type of status is not a enum value', async () => {
    dto.status = 'status';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeTruthy();
  });
  it('Type of status is enum value', async () => {
    dto.status = Status.ERROR;
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeFalsy();
    expect(dto.status).toBe('error');
  });
});
