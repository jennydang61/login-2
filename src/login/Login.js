import { useRef, useState, useEffect } from "react";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //replace it to navigate wiht react router to the desired page upom login

  useEffect(() => {
    emailRef.current.focus();
  }, []); // upon loading

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);
    setEmail("");
    setPwd("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1> You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
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
            <button>Sign In</button>{" "}
            {/* no need to specify onclick because this is the only button in the form*/}
            <p>
              Need an account?
              <br />
              <span className="line">
                <a href="#">Sign up</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
