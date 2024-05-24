import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  transform(value: any) {
    if (!isEmail(value)) {
      throw new BadRequestException(`Invalid email format: ${value}`);
    }
    return value;
  }
}
