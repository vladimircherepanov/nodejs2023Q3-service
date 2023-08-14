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
import { TrackInterface } from '../../interfaces';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<TrackInterface[]> {
    try {
      return await this.tracksService.getAll();
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
  ): Promise<TrackInterface | boolean> {
    const track = await this.tracksService.getById(uuid);
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackInterface> {
    try {
      return await this.tracksService.create(createTrackDto);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackInterface | boolean> {
    const track = await this.tracksService.update(uuid, updateTrackDto);
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track not found');
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
      throw new NotFoundException('Track not found');
    }
  }
}
