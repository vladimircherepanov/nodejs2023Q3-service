import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';

import { FavsModule } from './favs/favs.module';
import { FavsArtistsModule } from './favs/artists/artists.module';
import { FavsAlbumsModule } from './favs/albums/albums.module';
import { FavsTracksModule } from './favs/tracks/tracks.module';
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
