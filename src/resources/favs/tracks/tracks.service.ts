import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsTracks } from '../../../db/entities/favsTracks.entity';

@Injectable()
export class FavsTracksService {
  constructor(
    @InjectRepository(FavsTracks)
    private favsTracksRepository: Repository<FavsTracks>,
  ) {}

  async getAll() {
    return await this.favsTracksRepository.find();
  }

  async create(id: string) {
    const album = await this.favsTracksRepository.create({
      id: id,
    });
    await this.favsTracksRepository.save(album);
  }

  async delete(id: string) {
    const track = await this.favsTracksRepository.findOne({ where: { id } });
    if (track) {
      await this.favsTracksRepository.delete(id);
      return true;
    }
    return false;
  }
}
