import {
  Controller,
  Param,
  HttpCode,
  Post,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsAlbumsService } from './albums.service';
import { AlbumsService } from '../../albums/albums.service';

@Controller('')
export class AlbumsController {
  constructor(
    private readonly favsAlbumsService: FavsAlbumsService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ) {
    const album = await this.albumsService.getById(uuid);
    if (album) {
      await this.favsAlbumsService.create(uuid);
    } else throw new UnprocessableEntityException('Album not found');
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
    const album = await this.favsAlbumsService.delete(uuid);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
