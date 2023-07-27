import {
  Controller,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Album } from '../interfaces';
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Album[]> {
    try {
      return await this.albumsService.getAll();
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ): Promise<Album> {
    const album = await this.albumsService.getById(uuid);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const artist = await this.artistsService.getById(artistId);
    if (artist) {
      try {
        return await this.albumsService.create(createAlbumDto);
      } catch (error) {
        throw HttpStatus.INTERNAL_SERVER_ERROR;
      }
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<void> {
    const album = await this.albumsService.update(uuid, updateAlbumDto);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ): Promise<void> {
    const album = await this.albumsService.delete(uuid);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
