import { IsString, IsInt } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  artistId: string;
}
