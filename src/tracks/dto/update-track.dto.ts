import { IsString, IsInt } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsInt()
  duration: number;
  @IsString()
  artistId: string;
  @IsString()
  albumId: string;
}
