import axios from "axios";
export const removeWatchlater = async (videoId, token) => {
  try {
    const { data, status } = await axios.delete(
      `/api/user/watchlater/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    return { error: 0, data, status };
  } catch (error) {
    return { error: 1, msg: error };
  }
};
