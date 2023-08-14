import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { FavsArtistsService } from './artists.service';
import { FavsArtists } from '../../../db/entities/favsArtists.entity';
import { Artist } from '../../../db/entities/artist.entity';
import { ArtistsService } from '../../artists/artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavsArtists, Artist])],
  controllers: [ArtistsController],
  providers: [FavsArtistsService, ArtistsService],
  exports: [TypeOrmModule],
})
export class FavsArtistsModule {}
