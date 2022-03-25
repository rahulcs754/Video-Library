import { Link } from "react-router-dom";
import { useAuthData } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { Menu } from "./Menu";
export const Header = () => {
  const [showmenu, setShowmenu] = useState(false);
  const { userAuth } = useAuthData();
  const { isUserLoggedIn } = userAuth;

  return (
    <>
      <div className="rs-row">
        <div className="col-12">
          <header className="header">
            <h1 className="header-logo">
              <Link to="/">ESW</Link>
            </h1>

            <ul className="header-nav">
              <li>
                <Link to="/"> Home </Link>
              </li>

              <li>
                <Link to="/videolist"> Explore </Link>
              </li>
              {isUserLoggedIn ? (
                <li>
                  <Link to="/">Playlist </Link>
                </li>
              ) : null}
              <li>
                {isUserLoggedIn ? (
                  <div className="badge" onClick={() => setShowmenu(!showmenu)}>
                    <img
                      className="badge-img profile_icon_size"
                      src="https://picsum.photos/200"
                      alt="badge-1"
                    />
                    <div className="badge-item badge-online"></div>
                    {showmenu ? <Menu /> : null}
                  </div>
                ) : (
                  <button className="header-btn">
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </li>
            </ul>
          </header>
        </div>
      </div>
    </>
  );
};
