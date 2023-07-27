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
import { Artist } from '../interfaces';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly ArtistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Artist[]> {
    try {
      return await this.ArtistsService.getAll();
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
  ): Promise<Artist> {
    const artist = await this.ArtistsService.getById(uuid);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() createArtistDto: CreateArtistDto): Promise<void> {
    try {
      return await this.ArtistsService.create(createArtistDto);
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
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<void> {
    const artist = await this.ArtistsService.update(uuid, updateArtistDto);
    if (!artist) {
      throw new NotFoundException('Artist not found');
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
    const artist = await this.ArtistsService.delete(uuid);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
