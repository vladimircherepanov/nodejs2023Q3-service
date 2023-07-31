import {
  Controller,
  Param,
  HttpCode,
  Post,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ) {
    const artist = await this.artistsService.create(uuid);
    if (!artist) {
      //throw new NotFoundException('Artist not found');
      throw new UnprocessableEntityException('Artist not found')
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
    const artist = await this.artistsService.delete(uuid);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  } 
}
