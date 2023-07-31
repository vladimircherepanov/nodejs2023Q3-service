import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { tracks, favorites } from '../../../db/data';

@Injectable()
export class TracksService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor() {
    this.favorites = favorites;
  }

  create(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (track) {
      if (!this.favorites.tracks.map((e) => id).includes(id)) {
        this.favorites.tracks.push(track);
        return true;
      }
      return false;
    }
    return false;
  }

  delete(trackId: string) {
    const index = this.favorites.tracks.findIndex((e) => e === trackId);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
