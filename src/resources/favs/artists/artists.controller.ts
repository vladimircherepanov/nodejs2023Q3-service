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
import { FavsArtistsService } from './artists.service';
import { ArtistsService } from '../../artists/artists.service';

@Controller('')
export class ArtistsController {
  constructor(
    private readonly favsArtistsService: FavsArtistsService,
    private readonly artistsService: ArtistsService,
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
    const artist = await this.artistsService.getById(uuid);
    if (artist) {
      await this.favsArtistsService.create(uuid);
    } else throw new UnprocessableEntityException('Artist not found');
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
    const artist = await this.favsArtistsService.delete(uuid);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
