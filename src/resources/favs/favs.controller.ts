import { Controller, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { FavsService } from './favs.service';
import { AlbumsService } from "./albums/albums.service";
import { ArtistsService } from "./artists/artists.service";
import { TracksService} from "./tracks/tracks.service";

@Controller('')
export class FavsController {
  constructor(
      private readonly albumsService: AlbumsService,
      private readonly artistsService: ArtistsService,
      private readonly trackService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    try {
      const albums = await this.albumsService.getAll();
      const artists = await this.artistsService.getAll();
      const tracks = await this.trackService.getAll();
      return { albums, artists, tracks }

    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
