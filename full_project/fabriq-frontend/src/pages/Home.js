import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import background from "../images/background.webp";
import "../styles/main.scss";

const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center body-background"
        style={{
          height: "83.29vh", 
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="background-shadow"/>
        <div
          className="container container-sup text-center text-white" >
          <h5 className="fw-light mb-3" style={{ letterSpacing: "2px" }}>
            Personalized Fashion Recommendations
          </h5>
          <h1 className="display-4 fw-bold mb-4">
            FABRIQ AI Clothing Recommender
          </h1>
          <p className="lead mb-4">
            Upload your photos and receive AI-driven, tailored clothing suggestions
            curated just for your style and preferences.
          </p>
          <Link
            to="/recommendation-form"
            className="btn-custom btn btn-outline-light btn-lg rounded-pill px-5"
          >
            Try Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
