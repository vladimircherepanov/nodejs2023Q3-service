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
import { AlbumInterface } from '../../interfaces';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<AlbumInterface[]> {
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
  ): Promise<AlbumInterface | boolean> {
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
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumInterface> {
    try {
      const album = await this.albumsService.create(createAlbumDto);
      return album;
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
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
  ): Promise<AlbumInterface> {
    const album = await this.albumsService.update(uuid, updateAlbumDto);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ) {
    const album = await this.albumsService.delete(uuid);
    if (album) {
      console.log(album);
      return album;
    }
    throw new NotFoundException();
  }
}
