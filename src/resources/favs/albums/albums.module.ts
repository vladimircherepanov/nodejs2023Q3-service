import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavsAlbums } from './favsAlbums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavsAlbums])],
  controllers: [AlbumsController],
  providers: [AlbumsService], //, ArtistsService],
  exports: [TypeOrmModule],
})
export class FavsAlbumsModule {}
