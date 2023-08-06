import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsArtists } from './favsArtists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(FavsArtists)
    private favsArtistsRepository: Repository<FavsArtists>,
  ) {}

  async getAll() {
    return await this.favsArtistsRepository.find();
  }

  async create(id: string) {
    const album = await this.favsArtistsRepository.create({
      id: id,
    });
    await this.favsArtistsRepository.save(album);
  }

  async delete(id: string) {
    const album = await this.favsArtistsRepository.findOne({ where: { id } });
    if (album) {
      await this.favsArtistsRepository.delete(id);
      return true;
    }
    return false;
  }
}
