import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserInterface, CreateUserDto } from '../../interfaces';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return { user };
    }
    return false;
  }

  async create(userDto: CreateUserDto) {
    const user = this.usersRepository.create({
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const savedUser = await this.usersRepository.save(user);
    const { id, login, version, createdAt, updatedAt } = savedUser;
    return { id, login, version, createdAt, updatedAt };
  }

  async checkPassword(id: string, oldPassword: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      return user.checkPassword(oldPassword);
    } else return false;
  }

  async update(id: string, newPassword: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      user.password = newPassword;
      user.version++;
      user.updatedAt = Date.now();
      await this.usersRepository.save(user);
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } else return false;
  }

  async delete(id: string): Promise<boolean> {
    const user = this.usersRepository.findOneBy({ id });
    if (user) {
      await this.usersRepository.delete(id);
      return true;
    } else return false;
  }
}
