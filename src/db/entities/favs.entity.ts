import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { FavsAlbums } from './favsAlbums.entity';

@Entity()
export class Favs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /*Column()
    albumId: string;

    @Column()
    trackId: string;

    @OneToMany(() => FavsAlbums, albums => albums.favs)
    @JoinTable()
    albums: FavsAlbums[]

     */
}
