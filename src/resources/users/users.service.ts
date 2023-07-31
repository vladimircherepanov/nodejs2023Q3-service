import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDto } from '../../interfaces';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { users } from '../../db/data';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor() {
    this.users = users;
  }

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: CreateUserDto) {
    const id = uuidv4();
    const request = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1, // integer number, increments on update
      createdAt: Date.now(), // timestamp of creation
      updatedAt: Date.now(), // timestamp of last update
    };
    this.users.push({
      id: request.id,
      login: request.login,
      password: request.password,
      version: request.version,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    });
    return {
      id: request.id,
      login: request.login,
      version: request.version,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };
  }

  checkPassword(id: string, oldPassword: string) {
    return this.users.find((user) => user.id === id).password === oldPassword;
  }

  update(id: string, newPassword: string) {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();

      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    }

    return false;
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
