import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { UsersService } from '../../resources/users/users.service';
import { User } from '../../db/entities/user.entity';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [UsersService, AuthService, JwtService],
  exports: [TypeOrmModule],
})
export class LoginModule {}
