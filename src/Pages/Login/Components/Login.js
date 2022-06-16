import styles from "./Login.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthData } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginForm = () => {
  const navigate = useNavigate();

  const { userAuth, DispatchUserAuth } = useAuthData();
  const { isUserLoggedIn } = userAuth;

  if (isUserLoggedIn) {
    navigate("/explore/all");
  }

  const [login, setLogin] = useState({
    email: "",
    password: "",
    viewPassword: false,
    error: "",
  });

  // destructure login variable
  const { email, password, viewPassword, error } = login;

  // set error
  const setError = (msg) => {
    setLogin((prev) => ({
      ...prev,
      error: msg,
    }));
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const { encodedToken, foundUser } = response.data;
        DispatchUserAuth({
          type: "LOGIN_SUCCESS",
          encodedToken: encodedToken,
          userDetails: foundUser,
        });
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("Firstname", foundUser.firstName);
        toast.success("Login Successfully");
        navigate("/explore/all");
      }
    } catch (err) {
      toast.success("Login failed wrong user credentials");
    }
  };

  // password view
  const handlerViewPassword = () => {
    setLogin((prev) => ({ ...prev, viewPassword: !prev.viewPassword }));
  };

  // controlled input set
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  //set default entry for login
  const handlerGuestEntry = async () => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: "rahul@gmail.com",
        password: "123",
      });

      if (response.status === 200 || response.status === 201) {
        const { encodedToken, foundUser } = response.data;
        DispatchUserAuth({
          type: "LOGIN_SUCCESS",
          encodedToken: encodedToken,
          userDetails: foundUser,
        });
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("Firstname", foundUser.firstName);
        toast.success("Login Successfully");
        navigate("/explore/all");
      }
    } catch (err) {
      toast.success("Login failed wrong user credentials");
    }
  };

  return (
    <div className={`flex flex-center ${styles.login_box}`}>
      <form className={styles.login_form} onSubmit={submitHandler}>
        <div className="login-title f-m text-center">Login</div>
        <div className="text-danger text-center">{error ?? error}</div>
        <div className="input-box">
          <label className="label-text ">Email Address</label>
          <input
            type="text"
            className="field-item"
            name="email"
            required
            value={email}
            onChange={changeHandler}
          />
        </div>
        <div className="input-box input-box-icon ">
          <label className="label-text">Password</label>
          <input
            type={viewPassword ? "text" : "password"}
            className="field-item"
            name="password"
            required
            value={password}
            onChange={changeHandler}
          />
          <div
            className="error-icon"
            tooltip="show"
            onClick={handlerViewPassword}
          >
            <i className="fas fa-eye input-error-icon icon-gray" />
          </div>
        </div>
        <div className="input-box mt-s">
          <input type="checkbox" className="mr-m" /> Remeber
          <a href="#"> Forgot Password</a>
        </div>
        <div className="space-between mt-s">
          <button className="btn btn-primary d-inline" type="submit">
            Log In
          </button>
          <button
            className="btn btn-primary d-inline"
            onClick={handlerGuestEntry}
            type="button"
          >
            Guest Entry
          </button>
          <button className="btn btn-primary d-inline">
            <Link to="/signup">Create New Account </Link>
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
