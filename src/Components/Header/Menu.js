import { Link } from "react-router-dom";
import { useAuthData } from "../../Context/AuthContext";
export const Menu = () => {
  const Firstname = localStorage.getItem("Firstname");
  const { DispatchUserAuth } = useAuthData();

  const logoutHandler = () => {
    DispatchUserAuth({
      type: "LOGOUT",
    });
  };
  return (
    <div className="menu">
      <h3>Welcome {Firstname}</h3>
      <ul>
        <li>
          <Link to="#">My profile</Link>
        </li>
        <li onClick={logoutHandler}>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};
