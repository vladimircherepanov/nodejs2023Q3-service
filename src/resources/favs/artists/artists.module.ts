import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { FavsArtists } from './favsArtists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavsArtists])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [TypeOrmModule],
})
export class FavsArtistsModule {}
