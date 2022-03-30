import axios from "axios";
export const removePlaylist = async (playlistId, token) => {
  try {
    const { data, status } = await axios.delete(
      `/api/user/playlists/${playlistId}`,
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
