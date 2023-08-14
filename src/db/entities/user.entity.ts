import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'int' })
  createdAt: number;

  @Column({ type: 'int' })
  updatedAt: number;

  /////////////////////

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // process.env.CRYPT_SALT);
  }

  checkPassword(oldPassword: string): Promise<boolean> {
    return bcrypt.compare(oldPassword, this.password);
  }
}
