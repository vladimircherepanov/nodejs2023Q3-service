import {
  Controller,
  Body,
  HttpCode,
  Post,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { Public } from '../../decorators/public.decorator';
@Controller('')
export class RefreshController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async refresh(@Body() refreshUserDto: RefreshTokenDto) {
    try {
      return await this.authService.refresh(refreshUserDto);
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
