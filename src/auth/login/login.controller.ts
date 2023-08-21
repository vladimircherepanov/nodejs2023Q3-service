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
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async create(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);
    if (login) {
      return login;
    } else throw new ForbiddenException('Login or password wrong');
  }
}
