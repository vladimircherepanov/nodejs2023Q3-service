import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsArtists } from '../../../db/entities/favsArtists.entity';

@Injectable()
export class FavsArtistsService {
  constructor(
    @InjectRepository(FavsArtists)
    private favsArtistsRepository: Repository<FavsArtists>,
  )
  {}

  async getAll() {
    return await this.favsArtistsRepository.find();
  }

  async create(id: string) {
      const savedArtist = await this.favsArtistsRepository.create({
        id: id,
      })
      await this.favsArtistsRepository.save(savedArtist);
  }

  async delete(id: string) {
    const artist = await this.favsArtistsRepository.findOne({ where: { id } });
    if (artist) {
      await this.favsArtistsRepository.delete(id);
      return true;
    }
    return false;

  }
}
