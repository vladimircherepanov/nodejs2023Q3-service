import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../../db/entities/artist.entity';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [TypeOrmModule],
})
export class ArtistsModule {}
