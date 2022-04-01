import axios from "axios";
export const addVideoPlaylist = async (playlistId, video, token) => {
  try {
    const { data, status } = await axios.post(
      `/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: { authorization: token },
      }
    );

    if (status === 200 || status === 201) {
      return { error: 0, status, data };
    }
  } catch (error) {
    return { error: 1, data: error };
  }
};
