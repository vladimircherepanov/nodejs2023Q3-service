import { IsString, IsInt } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  artistId: string;
}
