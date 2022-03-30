import axios from "axios";
export const removeFromLikes = async (videoId, token) => {
  try {
    const { data, status } = await axios.delete(`/api/user/likes/${videoId}`, {
      headers: { authorization: token },
    });
    if (status === 200 || status === 201) {
      return { error: 0, data, status };
    }
  } catch (error) {
    return { error: 1 };
  }
};
