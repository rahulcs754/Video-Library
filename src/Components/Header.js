import {Link} from "react-router-dom";
export const Header = () => {
    return (
        <>
          <div className="rs-row">
            <div className="col-12">
              <header className="header">
                <h1 className="header-logo">
                  <Link to="/">ESW</Link>
                </h1>
                <div className="header-search">
                  <input
                    type="text" 
                    className="header-input field-item"
                    placeholder="Search"
                  />
                  <div className="error-icon header-error-icon">
                    <i className="fas fa-search input-error-icon header-search-icon" />
                  </div>
                </div>
                <ul className="header-nav">
                  <li>
                    <Link to="/"> Home </Link>
                  </li>

                  <li>
                    <Link to="/"> Explore </Link>
                  </li>
                   

                  <li>
                    <button className="header-btn">
                      <Link to="/login">Login</Link>
                    </button>
                  </li>
                </ul>
              </header>
            </div>
          </div>
        </>
      );
}