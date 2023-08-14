import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album;
}
