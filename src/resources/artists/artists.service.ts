import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistInterface, CreateArtistDto } from '../../interfaces';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../../db/entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async getAll(): Promise<ArtistInterface[]> {
    return await this.artistsRepository.find();
  }

  async getById(id: string): Promise<ArtistInterface | boolean> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (artist) {
      return artist;
    } else return false;
  }

  async create(artistDto: CreateArtistDto): Promise<ArtistInterface> {
    const artist = this.artistsRepository.create({
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    });
    return await this.artistsRepository.save(artist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistInterface | boolean> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return await this.artistsRepository.save(artist);
    } else return false;
  }

  async delete(id: string): Promise<boolean> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (artist) {
      await this.artistsRepository.delete(id);
      return true;
    } else return false;
  }
}
