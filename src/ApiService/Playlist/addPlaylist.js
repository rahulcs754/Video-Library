import axios from "axios";
export const addPlaylist = async (playlistdetails, token) => {
  try {
    const {
      data: { playlists },
      status,
    } = await axios.post(
      "/api/user/playlists",
      {
        playlist: playlistdetails,
      },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      return { error: 0, playlists, status };
    }
  } catch (error) {
    return { error: 1 };
  }
};
