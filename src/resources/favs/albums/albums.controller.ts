import {
  Controller,
  Param,
  HttpCode,
  Post,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ) {
    const album = await this.albumsService.create(uuid);
    if (!album) {
      throw new NotFoundException('Album not found of Album already in favs');
    } else { return album }
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
