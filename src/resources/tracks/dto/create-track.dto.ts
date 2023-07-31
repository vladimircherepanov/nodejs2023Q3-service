import {IsString, IsInt, IsOptional} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsInt()
  duration: number;
  @IsOptional()
  @IsString()
  artistId: string;
  @IsOptional()
  @IsString()
  albumId: string;
}
