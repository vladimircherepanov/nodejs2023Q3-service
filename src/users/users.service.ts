import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDto } from '../interfaces';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { users } from '../db/data';

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

  create(userDto: CreateUserDto): void {
    this.users.push({
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1, // integer number, increments on update
      createdAt: Date.now(), // timestamp of creation
      updatedAt: Date.now(), // timestamp of last update
    });
  }

  checkPassword(id: string, oldPassword: string) {
    return this.users.find((user) => user.id === id).password === oldPassword;
  }

  update(id: string, newPassword: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = {
        id: this.users[index].id,
        login: this.users[index].login,
        password: newPassword,
        version: this.users[index].version + 1,
        createdAt: this.users[index].createdAt,
        updatedAt: Date.now(),
      };
      return true;
    } else {
      return false;
    }
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
