import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Artist } from "../artists/artist.entity";
import { Track } from "../tracks/track.entity";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ default: null})
  artistId: string;

  @OneToMany(() => Track, track => track.albumId,{ cascade: true })
  tracks: Track[];

  @ManyToOne(() => Artist,  artist => artist.albums, { onDelete: "SET NULL"})
  artist: Artist
}
