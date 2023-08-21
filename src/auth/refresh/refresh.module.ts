import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshController } from './refresh.controller';
import { UsersService } from '../../resources/users/users.service';
import { AuthService } from '../auth.service';
import { User } from '../../db/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RefreshController],
  providers: [AuthService, UsersService, JwtService],
  exports: [TypeOrmModule],
})
export class RefreshModule {}
