import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { FavsAlbumsService } from './albums.service';
import { FavsAlbums } from '../../../db/entities/favsAlbums.entity';
import { Album } from '../../../db/entities/album.entity';
import { AlbumsService } from '../../albums/albums.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavsAlbums, Album])],
  controllers: [AlbumsController],
  providers: [FavsAlbumsService, AlbumsService],
  exports: [TypeOrmModule],
})
export class FavsAlbumsModule {}
