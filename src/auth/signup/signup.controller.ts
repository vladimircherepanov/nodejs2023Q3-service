import {
  Controller,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
  UsePipes,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignUpDto } from '../dto/signUp.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('')
export class SignupController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    if (user) {
      return user;
    } else throw new UnprocessableEntityException('Login already in use');
  }
}
