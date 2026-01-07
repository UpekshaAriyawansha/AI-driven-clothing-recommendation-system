import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import background from "../images/background.webp";
import { FaRegLightbulb, FaTshirt, FaPalette } from "react-icons/fa";
import "../styles/main.scss";
const About = () => {
  const features = [
    {
      icon: <FaRegLightbulb size={30} className="text-white mb-2" />,
      title: "AI-Powered Recommendations",
      description:
        "FABRIQ AI uses advanced algorithms to provide clothing suggestions tailored to your body shape.",
    },
    {
      icon: <FaTshirt size={30} className="text-white mb-2" />,
      title: "Personalized Style",
      description:
        "Get outfit suggestions that match your unique taste using skin color, gender, age, height, weight and occasion, ensuring you always look your best.",
    },
    {
      icon: <FaPalette size={30} className="text-white mb-2" />,
      title: "Color & Pattern Analysis",
      description:
        "Our AI analyzes your photo and personal details to detect colors and patterns with designs the perfect look.",
    },
  ];

  return (
    <>
      <section
        className="py-5 body-background"
        style={{
          minHeight: "83.29vh",
          backgroundImage: `url(${background})`,
        }}
      >
      <div className="background-shadow"/>
        <div className="container container-sup pt-5">
          <h4 className="text-center fw-bold display-6 mb-4">About FABRIQ AI</h4>
          <div className="row g-4 justify-content-center">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div
                  className="feature-card p-4 rounded-4 shadow-lg h-100 d-flex flex-column align-items-start"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="fw-bold mb-2 text-light">{feature.title}</h4>
                  <p className="mb-0 text-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
