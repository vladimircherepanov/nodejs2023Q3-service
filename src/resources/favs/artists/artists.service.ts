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
        this.favorites.artists.push(artist.id);
        return true;
      }
      return false;
  }

  delete(id: string) {
    const index = this.favorites.artists.findIndex((e) => e === id)
    if (index) {
      this.favorites.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
