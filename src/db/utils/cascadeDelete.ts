import { albums, tracks } from '../data';

export const deleteTracks = (id: string) => {
  const tracksForDelete = tracks.filter((track) => track.albumId === id);
  const trackIdsForDelete = tracksForDelete.map((e) => e.id);

  trackIdsForDelete.forEach((trackId) => {
    tracks.splice(
      tracks.findIndex((e) => e.id === trackId),
      1,
    );
  });
};

export const deleteAlbums = (id: string) => {
  const albumsForDelete = albums.filter((album) => album.artistId === id);
  const albumIdsForDelete = albumsForDelete.map((e) => e.id);

  albumIdsForDelete.forEach((albumId) => {
    deleteTracks(albumId);
    albums.splice(
      albums.findIndex((e) => e.id === albumId),
      1,
    );
  });
};
