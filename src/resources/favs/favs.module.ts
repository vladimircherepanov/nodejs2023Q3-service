import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { Favs } from "./favs.entity";
import { AlbumsService} from "./albums/albums.service";
import { FavsAlbums } from "./albums/favsAlbums.entity";
import { FavsArtists } from "./artists/favsArtists.entity";
import { ArtistsService } from "./artists/artists.service";
import { FavsTracks } from "./tracks/favsTracks.entity";
import { TracksService } from "./tracks/tracks.service";


@Module({
  imports: [TypeOrmModule.forFeature([Favs, FavsAlbums, FavsArtists, FavsTracks])],
  controllers: [FavsController],
  providers: [FavsService, AlbumsService, ArtistsService, TracksService],
  exports: [TypeOrmModule]

})
export class FavsModule {}
