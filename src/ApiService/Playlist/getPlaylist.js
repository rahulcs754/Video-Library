import axios from "axios";
export const getPlaylist = async (token) => {
  try {
    const {
      data: { playlists },
      status,
    } = await axios.get("/api/user/playlists", {
      headers: { authorization: token },
    });
    if (status === 200 || status === 201) {
      return { error: 0, playlists, status };
    }
  } catch (error) {
    return { error: 1 };
  }
};
