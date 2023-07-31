import {IsString, IsInt, IsOptional} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsInt()
  duration: number;
  @IsString()
  @IsOptional()
  artistId: string;
  @IsString()
  @IsOptional()
  albumId: string;
}
