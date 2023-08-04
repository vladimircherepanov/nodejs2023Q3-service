import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsTracks } from "./favsTracks.entity";


@Injectable()
export class TracksService {

  constructor(
      @InjectRepository(FavsTracks)
      private favsTracksRepository: Repository<FavsTracks>,
  ) {}

  async getAll() {
    return await this.favsTracksRepository.find()
  }

  async create(id: string) {
    const album = await this.favsTracksRepository.create({
      id: id
    })
    await this.favsTracksRepository.save(album);
  }

  async delete(id: string) {
    const track = await this.favsTracksRepository.findOne({ where: { id } } )
    if (track) {
      await this.favsTracksRepository.delete(id)
      return true;
    }
    return false;
  }
}
