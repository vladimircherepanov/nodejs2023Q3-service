import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album, CreateAlbumDto } from '../interfaces';
import { UpdateAlbumDto } from './dto/update-Album.dto';
import { albums } from '../db/data';

import { deleteTracks } from '../db/utils/cascadeDelete';

@Injectable()
export class AlbumsService {
  private readonly albums = [];

  constructor() {
    this.albums = albums;
  }

  getAll(): Album[] {
    return this.albums;
  }

  getById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    this.albums.push({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums[index] = {
        id: this.albums[index].id,
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      };
      return true;
    } else {
      return false;
    }
  }

  delete(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      deleteTracks(id);
      this.albums.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
