import axios from "axios";
export const removeHistory = async (id, token) => {
  try {
    const {
      data: { history },
      status,
    } = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200 || status === 201) {
      return { error: 0, history, status };
    }
  } catch (error) {
    return { error: 1, msg: error };
  }
};
