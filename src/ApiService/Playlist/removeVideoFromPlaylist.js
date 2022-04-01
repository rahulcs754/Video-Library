import axios from "axios";
export const removeVideoFromPlaylist = async (playlistId, videoId, token) => {
  try {
    const { data, status } = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      return { error: 0, status, data };
    }
  } catch (error) {
    return { error: 1 };
  }
};
