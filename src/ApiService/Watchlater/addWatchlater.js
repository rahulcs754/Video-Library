import axios from "axios";
export const addWatchlater = async (video, token) => {
  try {
    const { data, status } = await axios.post(
      "/api/user/watchlater",
      { video },
      {
        headers: { authorization: token },
      }
    );
    return { error: 0, data, status };
  } catch (error) {
    return { error: 1, msg: error };
  }
};
