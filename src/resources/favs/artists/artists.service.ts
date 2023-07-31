import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { artists, favorites } from '../../../db/data';

@Injectable()
export class ArtistsService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor() {
    this.favorites = favorites;
  }

  create(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (artist) {
      if (!this.favorites.artists.map((e) => id).includes(id)) {
        this.favorites.artists.push(artist);
        return true;
      }
      return false;
    }
    return false;
  }

  delete(id: string) {
    const index = this.favorites.artists.indexOf(id);
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
