import axios from "axios";
export const addLikes = async (video, token) => {
  try {
    const { data, status } = await axios.post(
      "/api/user/likes",
      { video },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      return { error: 0, data, status };
    }
  } catch (error) {
    return { error: 1, msg: error };
  }
};
