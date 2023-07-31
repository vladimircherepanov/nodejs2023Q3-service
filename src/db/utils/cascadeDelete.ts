import { albums, tracks } from '../data';

export const deleteTracks = (id: string) => {
  const tracksToUpdate = tracks.filter((track) => track.albumId === id);

  tracksToUpdate.forEach((track) => {
    const index = tracks.findIndex((e) => e.id === track.id);
    if (index !== -1) {
      tracks[index].albumId = null;
      tracks[index].artistId = null;

    }
  });
};

export const deleteAlbums = (id: string) => {
  const albumsForDelete = albums.filter((album) => album.artistId === id);
  const albumIdsForDelete = albumsForDelete.map((e) => e.id);

  albumIdsForDelete.forEach((albumId) => {
    deleteTracks(albumId);
    const index = albums.findIndex((e) => e.id === id);
    if (index !== -1) {
      console.log(albums[index])
      albums[index].artistId = null;

    }
  })
};
