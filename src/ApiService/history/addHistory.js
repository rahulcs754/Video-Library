import axios from "axios";
export const addHistory = async (video, token) => {
  try {
    const {
      data: { history },
      status,
    } = await axios.post(
      "/api/user/history",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200 || status === 201) {
      return { error: 0, history, status };
    }
  } catch (error) {
    return { error: 1, msg: error };
  }
};
