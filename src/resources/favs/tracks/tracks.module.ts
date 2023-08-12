import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksController } from './tracks.controller';
import { FavsTracksService } from './tracks.service';
import { FavsTracks } from '../../../db/entities/favsTracks.entity';
import {Track} from "../../../db/entities/track.entity";
import {TracksService} from "../../tracks/tracks.service";

@Module({
  imports: [TypeOrmModule.forFeature([FavsTracks, Track])],
  controllers: [TracksController],
  providers: [FavsTracksService, TracksService],
  exports: [TypeOrmModule],
})
export class FavsTracksModule {}
