import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsModule } from './resources/artists/artists.module';
import { UsersModule } from './resources/users/users.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { TracksModule } from './resources/tracks/tracks.module';

import { FavsModule } from './resources/favs/favs.module';
import { FavsArtistsModule } from './resources/favs/artists/artists.module';
import { FavsAlbumsModule } from './resources/favs/albums/albums.module';
import { FavsTracksModule } from './resources/favs/tracks/tracks.module';
import { RouterModule } from '@nestjs/core';

import { User } from './resources/users/user.entity';
import { Artist } from './resources/artists/artist.entity';
import { Album } from './resources/albums/album.entity';
import { Track } from './resources/tracks/track.entity';
import { Favs } from "./resources/favs/favs.entity";
import { FavsAlbums } from "./resources/favs/albums/favsAlbums.entity";
import { FavsArtists } from "./resources/favs/artists/favsArtists.entity";
import { FavsTracks } from "./resources/favs/tracks/favsTracks.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser', // dotenv it
      password: 'myuserpassword',
      database: 'mydatabase',
      entities: [User, Artist, Album, Track, Favs, FavsAlbums, FavsArtists, FavsTracks ],
      synchronize: true,
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
