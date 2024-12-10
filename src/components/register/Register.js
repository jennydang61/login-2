import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";
import botProfile from "../../images/botProfile.png";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const NAME_REGEX = /^[A-Za-z]{2,}(?:[-' ][A-Za-z]+)*.{3,}$/; // username must start with a letter (lower or upper case), followed by 3-23 characters -- username must be at least 4 characters long, and not more then 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // password requires at least one lower case letter, one upper case letter, and one special character, and has to be between 8-24 characters long
const REGISTER_URL = "/register";

const Register = () => {
  // react functional component; rafce
  const nameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []); // when the component loads, the name input will be focused

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [name]); // anytime "name" changes, it will check the validation

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result); // devel
    // console.log(pwd); // devel
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, pwd, matchPwd]); // error message whenever there is error with name, pwd or matchPwd

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    // const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name,
          email,
          password: pwd,
          user_type: "STUDENT",
          yos: 2,
          major: "fe",
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      console.log(response.data); // response from the server
      //   console.log(response.accessToken);
      //   console.log(JSON.stringify(response));
      setSuccess(true);
      navigate("/create-profile"); // redirect to create-profile
      // clear input fields from the registration form
    } catch (err) {
      if (!err?.response) {
        // haven't heard back from the server
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Already Exists!");
      } else {
        setErrMsg("Registration Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <main className="create-account-container">
          <div className="content-wrapper">
            <section className="main-content">
              <div className="content-columns">
                <div className="success-column">
                  <h1>Success!</h1>
                  <br />
                  <p>
                    <a href="login">Sign In</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="create-account-container">
          <div className="content-wrapper">
            <section className="main-content">
              <div className="content-columns">
                <div className="image-column">
                  <img
                    className="bot-profile"
                    src={botProfile}
                    alt="Bot Profile"
                  />
                </div>

                <div className="form-column">
                  <div className="form-content">
                    <section>
                      <h2 className="form-title">Create account</h2>
                      <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label htmlFor="name" className="input-label">
                            Full Name:
                            <span className={validName ? "valid" : "hide"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validName || !name ? "hide" : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="input-field"
                            placeholder="Enter your full name"
                            ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            area-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                          />
                          <p
                            id="namenote"
                            className={
                              nameFocus && name && !validName
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must contain 5 or more characters.
                            <br />
                            <br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please note special characters are not allowed
                            except for spaces, hyphens (-), and apostrophes (').
                          </p>
                        </div>

                        <div>
                          <label htmlFor="email" className="input-label">
                            Email:
                          </label>
                          <input
                            type="text"
                            id="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your school email"
                          />
                        </div>

                        <div>
                          <label htmlFor="password" className="input-label">
                            Password:
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={validPwd ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                              icon={faTimes}
                              className={validPwd || !pwd ? "hide" : "invalid"}
                            />
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Enter your password"
                            onChange={(e) => setPwd(e.target.value)}
                            valule={pwd}
                            required
                            area-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                          />
                          <p
                            id="pwdnote"
                            className={
                              pwdFocus && !validPwd
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            <br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            <br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                          </p>
                        </div>

                        <div>
                          <label htmlFor="confirm_pwd" className="input-label">
                            Confirm Password:
                            <span
                              className={
                                validMatch && matchPwd ? "valid" : "hide"
                              }
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validMatch || !matchPwd ? "hide" : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <input
                            type="password"
                            id="confirm_pwd"
                            className="input-field"
                            placeholder="Re-enter password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            area-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                          />
                          <p
                            id="confirmnote"
                            className={
                              matchFocus && !validMatch
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Mudt match the first password input field.
                          </p>
                        </div>

                        <button
                          className="sign-up-button"
                          disabled={
                            !validName || !validPwd || !validMatch
                              ? true
                              : false
                          }
                        >
                          Sign up
                        </button>
                      </form>
                      <p>
                        Already registered?
                        <br />
                        <span className="line">
                          {/* put router link here */}
                          <a href="login">Sign In</a> 
                        </span>
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Register;
