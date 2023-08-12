import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from './db/datasource';

import { ArtistsModule } from './resources/artists/artists.module';
import { UsersModule } from './resources/users/users.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { TracksModule } from './resources/tracks/tracks.module';
import { FavsModule } from './resources/favs/favs.module';
import { FavsArtistsModule } from './resources/favs/artists/artists.module';
import { FavsAlbumsModule } from './resources/favs/albums/albums.module';
import { FavsTracksModule } from './resources/favs/tracks/tracks.module';

import { User } from './db/entities/user.entity';
import { Artist } from './db/entities/artist.entity';
import { Album } from './db/entities/album.entity';
import { Track } from './db/entities/track.entity';
import { Favs } from './db/entities/favs.entity';
import { FavsAlbums } from './db/entities/favsAlbums.entity';
import { FavsArtists } from './db/entities/favsArtists.entity';
import { FavsTracks } from './db/entities/favsTracks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [
        User,
        Artist,
        Album,
        Track,
        Favs,
        FavsAlbums,
        FavsArtists,
        FavsTracks,
      ],
    }),
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
    FavsArtistsModule,
    FavsAlbumsModule,
    FavsTracksModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavsModule,
        children: [
          {
            path: 'album',
            module: FavsAlbumsModule,
          },
          {
            path: 'artist',
            module: FavsArtistsModule,
          },
          {
            path: 'track',
            module: FavsTracksModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
