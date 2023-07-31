import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist, CreateArtistDto } from '../../interfaces';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists } from '../../db/data';

import { deleteAlbums } from '../../db/utils/cascadeDelete';

@Injectable()
export class ArtistsService {
  private readonly artists = [];

  constructor() {
    this.artists = artists;
  }

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  create(artistDto: CreateArtistDto) {
    const request = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
    this.artists.push({
      id: request.id,
      name: request.name,
      grammy: request.grammy,
    });
    return {
      id: request.id,
      name: request.name,
      grammy: request.grammy,
    };
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists[index] = {
        //id: this.artists[index].id,
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      };
      return {
        id: this.artists[index].id,
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      };
    } else {
      return false;
    }
  }

  delete(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      deleteAlbums(id);
      this.artists.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}