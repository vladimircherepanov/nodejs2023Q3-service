import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackInterface, CreateTrackDto } from '../../interfaces';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async getAll(): Promise<TrackInterface[]> {
    return await this.tracksRepository.find();
  }

  async getById(id: string): Promise<TrackInterface | boolean> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      return track;
    } else return false;
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.tracksRepository.create({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
    });
    return await this.tracksRepository.save(track);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackInterface | boolean> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      track.name = updateTrackDto.name;
      track.duration = updateTrackDto.duration;
      track.artistId = updateTrackDto.artistId;
      track.albumId = updateTrackDto.albumId;
      return await this.tracksRepository.save(track);
    } else return false;
  }

  async delete(id: string): Promise<boolean> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      await this.tracksRepository.delete(id);
      return true;
    } else return false;
  }
}
