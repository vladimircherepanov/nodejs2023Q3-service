export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface CreateAlbumDto {
  name: string;
  year: number;
  artistId: string;
}

export interface UpdateAlbumDto {
  name: string;
  year: number;
  artistId: string;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface CreateTrackDto {
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}

