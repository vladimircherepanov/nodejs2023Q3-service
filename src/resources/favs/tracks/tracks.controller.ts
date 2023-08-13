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
import { FavsTracksService } from './tracks.service';
import { TracksService } from '../../tracks/tracks.service';

@Controller('')
export class TracksController {
  constructor(
    private readonly favsTracksService: FavsTracksService,
    private readonly trackService: TracksService,
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
    const track = await this.trackService.getById(uuid);
    if (track) {
      await this.favsTracksService.create(uuid);
    } else throw new UnprocessableEntityException('Track not found');
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
    const track = await this.favsTracksService.delete(uuid);
    if (!track) {
      throw new NotFoundException('Artist not found');
    }
  }
}
