import React, { useState } from 'react';
import background from '../images/background.webp';
import RecForm from '../components/RecForm';
import UploadImage from '../components/UploadImage';


const Inputs = () => {

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          // height: "100vh",
          // overflowY: "auto",
        }}
      >
        <div className="container shadow rounded" style={{marginTop:"10px", marginBottom:"100px"}}>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card px-5 pt-5 rounded shadow-sm text-center" style={{ backgroundColor: "#E6E0F8", border: "solid 1px #F8F8F8",maxWidth:"750px", marginTop:"200px"}}>
                <h1 className="fw-bold mb-2 mt-2">Get Started with FABRIQ</h1>
                <hr style={{color:"gray"}}/>
                  <RecForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inputs;
