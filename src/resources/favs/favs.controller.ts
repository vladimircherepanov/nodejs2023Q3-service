import { Controller, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { FavsService } from './favs.service';

@Controller('')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Favorites> {
    try {
      return await this.favsService.getAll();
    } catch (error) {
      throw HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
