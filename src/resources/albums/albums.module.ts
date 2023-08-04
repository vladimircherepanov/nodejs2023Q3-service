import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from "./album.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
