import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favs {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
