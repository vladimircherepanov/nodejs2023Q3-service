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
import { TracksService } from './tracks.service';

@Controller('')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    uuid: string,
  ) {
    const track = await this.tracksService.create(uuid);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
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
    const track = await this.tracksService.delete(uuid);
    if (!track) {
      throw new NotFoundException('Artist not found');
    }
  }
}
