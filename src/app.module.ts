import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from "./tracks/tracks.module";

@Module({
  imports: [ArtistsModule, UsersModule, AlbumsModule, TracksModule],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
