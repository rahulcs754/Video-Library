import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../../Context";
const SignupForm = () => {
  const { userAuth } = useAuthData();
  const { isUserLoggedIn } = userAuth;
  const navigate = useNavigate();

  if (isUserLoggedIn) {
    navigate("/explore/all");
  }

  const [signupForm, setSignupForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: "",
    errors: {},
    submitted: false,
    loading: false,
    formError: "",
    isValid: false,
  });

  const [passwordView, setpasswordView] = useState({
    passwordshow: false,
    confirmPasswordshow: false,
  });

  // password view  state
  const { passwordshow, confirmPasswordshow } = passwordView;

  //destructure values
  const {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    errors,
    submitted,
    loading,
    formError,
    isValid,
  } = signupForm;

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setSignupForm((prev) => ({ ...prev, loading: true }));
    const { password, confirmPassword } = signupForm;
    if (password === confirmPassword) {
      setSignupForm((prev) => ({
        ...prev,
        loading: false,
        errors: {},
      }));
    } else {
      setSignupForm((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          password: `Password Must be equal`,
        },
      }));
    }

    const countError = Object.keys(signupForm.errors).length;
    if (countError === 0 && signupForm.accept === "on") {
      setSignupForm((prev) => ({
        ...prev,
        submitted: true,
        loading: false,
      }));

      try {
        const response = await axios.post(`/api/auth/signup`, {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        });

        // saving the encodedToken in the localStorage
        if (response.status === 201) {
          localStorage.setItem("token", response.data.encodedToken);
          setTimeout(() => navigate("/login"), 3000);

          setSignupForm((prev) => ({
            ...prev,
            isValid: true,
          }));
        } else if (response.status === 500) {
          setSignupForm((prev) => ({
            ...prev,
            loading: false,
            formErrors: "Login Credential wrong",
            isValid: false,
          }));
        } else if (response.status === 422) {
          setSignupForm((prev) => ({
            ...prev,
            loading: false,
            formErrors: "User Already Exits",
            isValid: false,
          }));
        }
      } catch (error) {
        setSignupForm((prev) => ({
          ...prev,
          loading: false,
          formErrors: error,
        }));
      }
    } else {
      setSignupForm((prev) => ({
        ...prev,
        submitted: false,
        loading: false,
      }));
    }
  };

  //change handler for controlled input
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="signup-box">
      {submitted ? (
        <>
          <div className="f-m text-thin">
            Welcome {firstname} ! you will redirect in Login page ✈︎
          </div>
        </>
      ) : (
        <form className="signup-form" onSubmit={submitHandler}>
          <div className="login-title f-m text-center">Signup</div>
          <div className="text-danger text-center">
            {formError ?? formError}
          </div>
          <div className="input-box">
            <label className="label-text ">First Name</label>
            <input
              type="text"
              className="field-item"
              name="firstname"
              value={firstname}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-box">
            <label className="label-text ">Last Name</label>
            <input
              type="text"
              className="field-item"
              name="lastname"
              value={lastname}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-box">
            <label className="label-text ">Email Address</label>
            <input
              type="email"
              className="field-item"
              name="email"
              value={email}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-box input-box-icon">
            <label className="label-text">Password</label>
            <input
              type={passwordshow ? "text" : "password"}
              className="field-item"
              name="password"
              value={password}
              onChange={changeHandler}
              required
            />
            <div
              className="error-icon"
              onClick={() =>
                setpasswordView((prev) => ({
                  ...prev,
                  passwordshow: !prev.passwordshow,
                }))
              }
            >
              <i className="fas fa-eye input-error-icon icon-gray" />
            </div>
          </div>
          <div className="input-box input-box-icon">
            <label className="label-text">Confirm Password</label>
            <input
              type={confirmPasswordshow ? "text" : "password"}
              className="field-item"
              name="confirmPassword"
              value={confirmPassword}
              onChange={changeHandler}
              required
            />
            <div
              className="error-icon"
              onClick={() =>
                setpasswordView((prev) => ({
                  ...prev,
                  confirmPasswordshow: !prev.confirmPasswordshow,
                }))
              }
            >
              <i className="fas fa-eye input-error-icon icon-gray" />
            </div>
            <span className="text-danger">
              {errors.password ? errors.password : null}
            </span>
          </div>
          <div className="input-box mt-m">
            <input
              type="checkbox"
              className="mr-s"
              name="accept"
              onChange={changeHandler}
              required
            />
            I accept all terms &amp; condition
          </div>
          <div className="space-between mt-m">
            <button className="btn btn-primary d-inline">
              {loading ? "Singup ..." : "Sign Up"}
            </button>
            <button className="btn btn-primary d-inline">
              <Link to="/login">Already Created Account</Link>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default SignupForm;
