import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import background from "../images/background.webp";
import { FaUpload, FaMagic, FaSearch, FaStar } from "react-icons/fa";
import "../styles/main.scss";

const Guide = () => {
  const steps = [
    {
      icon: <FaUpload size={30} className="text-white mb-2" />,
      title: "Step 1: Upload Your Photo",
      description:
        "Start by uploading a clear photo of yourself. The AI uses this image to understand your body shape. After Input your personal details for this given form",
    },
    {
      icon: <FaMagic size={30} className="text-white mb-2" />,
      title: "Step 2: Analyze & Recommend",
      description:
        "FABRIQ AI analyzes your details and provides tailored clothing suggestions, including styles, colors, and fabrics that suit you best.",
    },
    {
      icon: <FaStar size={30} className="text-white mb-2" />,
      title: "Step 3: Get Your Personalized Look",
      description:
        "Use FABRIQ’s recommendations to elevate your wardrobe. Mix and match items, or get inspired by the AI to try new fashion styles confidently.",
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
        <div className="container container-sup">
          <h4 className="text-center fw-bold display-6 mb-4">How to Use FABRIQ AI</h4>
          <div className="row g-4">
            {steps.map((step, index) => (
              <div className="col-md-6" key={index}>
                <div
                  className="feature-card p-4 rounded-4 shadow-lg h-100 d-flex flex-column align-items-start">
                  <div className="mb-3">{step.icon}</div>
                  <h4 className="fw-bold mb-2">{step.title}</h4>
                  <p className="mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Guide;
