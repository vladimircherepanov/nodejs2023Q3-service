export interface UserInterface {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export interface ArtistInterface {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface AlbumInterface {
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

export interface TrackInterface {
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

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
