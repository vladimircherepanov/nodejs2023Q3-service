import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';

@Controller('')
export class AuthController {
  @Public()
  @Get()
  findAll(): string {
    return 'This action returns nothing helpful';
  }
}
