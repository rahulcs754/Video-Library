import { Link } from "react-router-dom";
export const Banner = () => {
  return (
    <div className="home_banner banner_img">
      <h1 className="f-xxl ">WELCOME ESW</h1>
      <p className="bg-warning f-l mb-s letter-space banner_text">
        Stuck with code ? Worry Not!
      </p>
      <p className="bg-warning mb-s letter-space banner_text">
        Solve all your problems at one place with this video library.
      </p>
      <Link className="btn btn-primary" to="/explore/all">
        EXPLORE
      </Link>
      <svg className="arrows">
        <path className="a1" d="M0 0 L30 32 L60 0"></path>
        <path className="a2" d="M0 20 L30 52 L60 20"></path>
        <path className="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  );
};
