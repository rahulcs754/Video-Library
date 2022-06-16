import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../Context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userAuth } = useAuthData();

  const { isUserLoggedIn } = userAuth;

  return isUserLoggedIn ? children : navigate("/login");
};
