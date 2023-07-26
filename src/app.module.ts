import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from "./artists/artists.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ ArtistsModule, UsersModule ],
  //controllers: [AppController, UsersController],
  //providers: [AppService, UsersService],
})
export class AppModule {}
