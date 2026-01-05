import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import background from "../images/background.webp";

const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div
                className="card text-center shadow-lg p-5 rounded"
                style={{
                  border: "solid 1px #F8F8F8",
                  backgroundColor: "#E6E0F8",
                  opacity: 1,
                }}
              >
                <h5 className="fw-bold mt-3">Personalized Garment Suggestions</h5>
                <h1 className="fw-bold mt-3 mb-3">FABRIQ AI Clothing Recommender</h1>
                <p>Analyze photos for tailored recommendations</p>
                <Link
                  to="/inputs"
                  className="btn btn-dark btn-lg rounded-pill mt-3 mx-auto"
                  style={{ border: "solid 1px white", maxWidth: "300px" }}
                >
                  Try Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
