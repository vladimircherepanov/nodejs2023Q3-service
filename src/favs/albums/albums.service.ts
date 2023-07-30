import { Injectable } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { albums, favorites } from '../../db/data';

@Injectable()
export class AlbumsService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor() {
    this.favorites = favorites;
  }

  create(id: string) {
    const album = albums.find((album) => album.id === id);
    if (album) {
      if (!this.favorites.albums.map((e) => id).includes(id)) {
        this.favorites.albums.push(album);
        return true;
      }
      return false;
    }
    return false;
  }

  delete(id: string) {
    const index = this.favorites.albums.indexOf(id);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
      return true;
    }
    return false;
  }
}
