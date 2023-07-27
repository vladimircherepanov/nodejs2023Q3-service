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
} from '@nestjs/common';
import { User } from '../interfaces';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<User[]> {
    try {
      return await this.UsersService.getAll();
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ): Promise<User> {
    const artist = await this.UsersService.getById(uuid);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() createArtistDto: CreateUserDto): Promise<void> {
    try {
      return await this.UsersService.create(createArtistDto);
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = updateUserDto;
    const checkPassword = await this.UsersService.checkPassword(
      uuid,
      oldPassword,
    );
    if (checkPassword) {
      if (!this.UsersService.update(uuid, newPassword)) {
        throw new NotFoundException('User not found');
      }
    } else {
      throw new ForbiddenException('Old password is wrong');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ): Promise<void> {
    const artist = await this.UsersService.delete(uuid);
    if (!artist) {
      throw new NotFoundException('User not found');
    }
  }
}
