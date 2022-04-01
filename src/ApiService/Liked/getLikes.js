import axios from "axios";
export const getLikes = async (token) => {
  try {
    const { data, status } = await axios.get("/api/user/likes", {
      headers: { authorization: token },
    });
    if (status === 200 || status === 201) {
      return { error: 0, data, status };
    }
  } catch (error) {
    return { error: 1 };
  }
};
