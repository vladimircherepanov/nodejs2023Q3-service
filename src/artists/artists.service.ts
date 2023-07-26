import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist, CreateArtistDto } from '../interfaces';

@Injectable()
export class ArtistsService {
  private artists = [];

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  create(artistDto: CreateArtistDto) {
    this.artists.push({
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    });
  }

  update(id, updateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists[index] = {
        id: this.artists[index].id,
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      };
      return true;
    } else {
      return false;
    }
  }

  delete(id) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
