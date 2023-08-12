import { Injectable } from '@nestjs/common';
import { Favorites } from '../../../interfaces';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsAlbums } from '../../../db/entities/favsAlbums.entity';

@Injectable()
export class FavsAlbumsService {
  constructor(
    @InjectRepository(FavsAlbums)
    private favsAlbumsRepository: Repository<FavsAlbums>,
  ) {}

  async getAll() {
    const albumsIds = await this.favsAlbumsRepository.find();
    const ids = albumsIds.map((e) => e.id);

    const xxx = await this.favsAlbumsRepository.find({
      where: { id: In(ids) },
    });
    return xxx;
  }

  async create(id: string) {
    const album = await this.favsAlbumsRepository.create({
      id: id,
    });
    await this.favsAlbumsRepository.save(album);
  }

  async delete(id: string) {
    const album = await this.favsAlbumsRepository.findOne({ where: { id } });
    if (album) {
      await this.favsAlbumsRepository.delete(id);
      return true;
    }
    return false;
  }
}
