import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import background from "../images/background.webp";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import "../styles/main.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for contacting FABRIQ AI! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
          <h4 className="text-center fw-bold display-6 mb-4">Contact FABRIQ AI</h4>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div
                className="card p-5 rounded-4 bg-black text-white shadow-lg p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 d-flex align-items-center">
                    <FaUser className="me-3 text-light" size={24} />
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4 d-flex align-items-center">
                    <FaEnvelope className="me-3 text-light" size={24} />
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4 d-flex align-items-start">
                    <FaCommentDots className="me-3 text-light mt-2" size={24} />
                    <textarea
                      className="form-control"
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-custom btn btn-dark btn-lg rounded-pill px-5"
                    >
                      Send Message
                    </button>
                  </div>
                </form>

                <hr className="my-4" />

                <div className="text-center text-light">
                  <p className="mb-1">
                    Or reach us directly at:{" "}
                    <a
                      href="mailto:contact@fabriq.ai"
                      className="text-light fw-semibold"
                    >
                      contact@fabriq.ai
                    </a>
                  </p>
                  <p className="mb-0">
                    Follow us on:{" "}
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-light text-decoration-none me-2"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-light text-decoration-none me-2"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-light text-decoration-none"
                    >
                      Facebook
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
