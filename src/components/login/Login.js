import { useRef, useState, useEffect } from "react";
// import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation, replace } from "react-router-dom";
import "./Login.css";
import chatbotLaptop from "../../images/chatbotLaptop.png";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false); //replace it to navigate wiht react router to the desired page upom login

  useEffect(() => {
    emailRef.current.focus();
  }, []); // upon loading

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, pwd);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data)); // devel
      const role = response?.data?.role;
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, role, accessToken });
      setEmail(""); // clearing the input fields
      setPwd(""); // clearing the input fields
      //navigate("/home", { replace: true });
      // setSuccess(true);
      navigate(from, { replace: true }); // going back to where you came from after successful login
      // navigate("/home", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        console.log(err);
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    // <>
    //   {success ? (
    //     <section>
    //       <h1> You are logged in!</h1>
    //       <br />
    //       <p>
    //         <a href="/">Go to Home</a>
    //       </p>
    //     </section>
    //   ) : (
    <section className="sign-in-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="image-container">
        <img
          className="chat-bot-laptop"
          src={chatbotLaptop}
          alt="Bot Profile"
        />
      </div>
      <div className="form-container">
        <h1>
          Back to Finding <br /> Your Match
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email} //clear input upon submission
            required
          />
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd} //clear input upon submission
            required
          />
          <button className="sign-in-button">Sign In</button>{" "}
          {/* no need to specify onclick because this is the only button in the form*/}
          <p className="sign-up">
            Need an account?
            <br />
            <span className="line">
              <Link to="register">Sign up</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
    //   )}
    // </>
  );
};

export default Login;
