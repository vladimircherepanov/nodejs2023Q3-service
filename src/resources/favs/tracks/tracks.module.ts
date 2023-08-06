import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavsTracks } from './favsTracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavsTracks])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TypeOrmModule],
})
export class FavsTracksModule {}
