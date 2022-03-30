import { createContext, useContext, useReducer } from "react";
import { likedReducer } from "../Reducer/LikedReducer";
const LikedContext = createContext();

const intialValues = {
  liked: [],
  loading: false,
  error: "",
};

const LikedProvider = ({ children }) => {
  const [LikeState, LikeDispatch] = useReducer(likedReducer, intialValues);

  return (
    <LikedContext.Provider value={{ LikeState, LikeDispatch }}>
      {children}
    </LikedContext.Provider>
  );
};

const useLike = () => useContext(LikedContext);

export { useLike, LikedProvider };
