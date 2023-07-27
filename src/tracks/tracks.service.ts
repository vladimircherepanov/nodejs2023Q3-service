import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track, CreateTrackDto } from '../interfaces';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracks } from '../db/data';

@Injectable()
export class TracksService {
  private readonly tracks = [];

  constructor() {
    this.tracks = tracks;
  }

  getAll(): Track[] {
    return this.tracks;
  }

  getById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto) {
    this.tracks.push({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,

    });
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks[index] = {
        id: this.tracks[index].id,
        duration: updateTrackDto.duration,
        name: updateTrackDto.name,
        albumId: updateTrackDto.albumId,
        artistId: updateTrackDto.artistId,
      };
      return true;
    } else {
      return false;
    }
  }

  delete(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
