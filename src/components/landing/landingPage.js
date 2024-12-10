import "./landingPage.css";
import people from "../../images/people.png";
import chatbot from "../../images/chatbot.png";
import pfp from "../../images/pfp.png";
import pickinguser from "../../images/pickinguser.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="landing-page">
        <div className="div">
          <header className="nav-bar">
            <h1 className="logo">LOGO</h1>
            <nav>
              <Link to="/login" className="login">
                Sign in
              </Link>
            </nav>
          </header>
        </div>
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="find-your-perfect">
              Find Your Perfect <br /> Roommate Today!
            </h2>
            <button className="button" onClick={() => navigate("/register")}>
              Create Account
            </button>
          </div>
          <img className="people" src={people} alt="people" />
        </section>

        <section className="features">
          <h2 className="section-title">
            Your Perfect Match, Right Here On Campus
          </h2>

          <div className="group">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="rectangle" />
                <p className="p">Set your preferences and interests</p>
                <img className="pfp" src={pfp} alt="pfp" />
              </div>
            </div>

            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="rectangle-2" />
                <p className="text-wrapper-2">
                  Find potential roommates that match your criteria
                </p>
                <img
                  className="picking-user"
                  src={pickinguser}
                  alt="pickinguser"
                />
              </div>
            </div>

            <div className="div-wrapper">
              <div className="overlap-3">
                <div className="rectangle-3" />
                <p className="text-wrapper-3">
                  Start chatting with potential roommates to find the right fit
                </p>
                <img className="chatbot" src={chatbot} alt="chatbot" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LandingPage;
