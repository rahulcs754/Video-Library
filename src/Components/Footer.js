import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="section_box ">
      <div className="text-center">
        Connect with me{" "}
        <Link to="https://github.com/rahulcs754" className="pointer mr-s">
          Github
        </Link>
        |
        <Link to="https://twitter.com/Rahulcs754" className="pointer ml-s">
          Twitter
        </Link>
      </div>
    </div>
  );
};
