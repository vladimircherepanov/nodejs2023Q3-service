import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { Artist } from '../../db/entities/artist.entity';
import { Favs } from '../../db/entities/favs.entity';
import { Track } from '../../db/entities/track.entity';
import { Album } from '../../db/entities/album.entity';
import { FavsAlbumsService } from './albums/albums.service';
import { FavsAlbums } from '../../db/entities/favsAlbums.entity';
import { FavsArtists } from '../../db/entities/favsArtists.entity';
import { FavsArtistsService } from './artists/artists.service';
import { FavsTracks } from '../../db/entities/favsTracks.entity';
import { FavsTracksService } from './tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Favs,
      FavsAlbums,
      FavsArtists,
      FavsTracks,
      Artist,
      Track,
      Album,
    ]),
  ],
  controllers: [FavsController],
  providers: [
    FavsService,
    FavsAlbumsService,
    FavsTracksService,
    FavsArtistsService,
    ArtistsService,
    TracksService,
    AlbumsService,
  ],
  exports: [TypeOrmModule],
})
export class FavsModule {}
