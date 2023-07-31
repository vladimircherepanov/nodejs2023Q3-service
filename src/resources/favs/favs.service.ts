import { Injectable } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { albums, artists, tracks, favorites } from '../../db/data';

const favsArtists = [];

const addToFavs = () => {

}


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
    const albumsWithIdInFavorites = albums.filter((album) => this.favorites.albums.includes(album.id));
    const artistsWithIdInFavorites = artists.filter((artist) => this.favorites.artists.includes(artist.id));
    const tracksWithIdInFavorites = tracks.filter((track) => this.favorites.tracks.includes(track.id));

    return {
      albums: albumsWithIdInFavorites,
      artists: artistsWithIdInFavorites,
      tracks: tracksWithIdInFavorites,
    };
  }
}
