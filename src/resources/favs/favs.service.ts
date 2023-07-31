import { Injectable } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { favorites } from '../../db/data';

@Injectable()
export class FavsService {
  private readonly favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor() {
    this.favorites = favorites;
  }

  getAll(): Favorites {
    return this.favorites;
  }
}
