import { Module } from '@nestjs/common';
import { ArtistsModule } from './resources/artists/artists.module';
import { UsersModule } from './resources/users/users.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { TracksModule } from './resources/tracks/tracks.module';

import { FavsModule } from './resources/favs/favs.module';
import { FavsArtistsModule } from './resources/favs/artists/artists.module';
import { FavsAlbumsModule } from './resources/favs/albums/albums.module';
import { FavsTracksModule } from './resources/favs/tracks/tracks.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
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
