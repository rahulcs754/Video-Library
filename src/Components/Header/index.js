import { Link, NavLink } from "react-router-dom";
import { useAuthData } from "../../Context/AuthContext";
import { useState } from "react";
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
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active_url" : "normal"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active_url" : "normal"
                  }
                  to="/explore/all"
                >
                  Explore
                </NavLink>
              </li>
              {isUserLoggedIn ? (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active_url" : "normal"
                    }
                    to="/playlists"
                  >
                    Playlist
                  </NavLink>
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
