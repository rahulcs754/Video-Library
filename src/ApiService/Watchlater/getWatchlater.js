import axios from "axios";
export const getWatchlater = async (token) => {
  try {
    const { data, status } = await axios.get("/api/user/watchlater", {
      headers: { authorization: token },
    });
    return { error: 0, data, status };
  } catch (error) {
    return { error: 1, msg: error };
  }
};
