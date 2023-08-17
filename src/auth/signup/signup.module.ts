import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { SignupController } from './signup.controller';
import { UsersService } from '../../resources/users/users.service';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [AuthService, UsersService, JwtService],
  exports: [TypeOrmModule],
})
export class SignupModule {}
