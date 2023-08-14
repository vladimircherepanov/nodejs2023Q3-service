import { Controller, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { FavsService } from './favs.service';
import { FavsAlbumsService } from './albums/albums.service';
import { FavsArtistsService } from './artists/artists.service';
import { FavsTracksService } from './tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Controller('')
export class FavsController {
  constructor(
    private readonly favsAlbumsService: FavsAlbumsService,
    private readonly favsArtistsService: FavsArtistsService,
    private readonly favsTracksService: FavsTracksService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    try {
      const artists = [];
      const albums = [];
      const tracks = [];
      const favsAlbums = await this.favsAlbumsService.getAll();
      const albumsIds = await favsAlbums.map((e) => e.id);
      for (const id of albumsIds) {
        const album = await this.albumsService.getById(id);
        albums.push(album);
      }

      const favsArtists = await this.favsArtistsService.getAll();
      const artistsIds = await favsArtists.map((e) => e.id);
      for (const id of artistsIds) {
        const artist = await this.artistsService.getById(id);
        artists.push(artist);
      }

      const favsTracks = await this.favsTracksService.getAll();
      const tracksIds = await favsTracks.map((e) => e.id);
      for (const id of tracksIds) {
        const track = await this.tracksService.getById(id);
        tracks.push(track);
      }

      return { albums, artists, tracks };
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
