import { createContext, useContext } from "react";
import { useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const intialValue = {
    isUserLoggedIn: false,
    encodedToken: "",
    userDetails: {},
    loading: false,
    message: null,
  };

  const [userAuth, DispatchUserAuth] = useReducer(AuthReducer, intialValue);
  return (
    <AuthContext.Provider value={{ userAuth, DispatchUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthData = () => useContext(AuthContext);

export { useAuthData, AuthProvider };
