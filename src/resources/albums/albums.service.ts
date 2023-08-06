import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumInterface, CreateAlbumDto } from '../../interfaces';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async getAll(): Promise<AlbumInterface[]> {
    return await this.albumsRepository.find();
  }

  async getById(id: string): Promise<AlbumInterface | boolean> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (album) {
      return album;
    } else return false;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumInterface> {
    const artist = await this.albumsRepository.create({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
    return await this.albumsRepository.save(artist);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
      return await this.albumsRepository.save(album);
    } else return false;
  }

  async delete(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (album) {
      await this.albumsRepository.delete(id);
      return true;
    } else return false;
  }
}
