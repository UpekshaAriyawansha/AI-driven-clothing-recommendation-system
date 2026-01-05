import React from "react";
import background from "../images/background.webp"
import img from "../images/img.jpeg"



const Recommendations = () => {
    return(
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
                  overflowY: "auto",
                }}
              >
                <div className="container rounded" style={{marginTop:"10px", marginBottom:"100px"}}>
                    <div className="row justify-content-center">
                        <div className="card px-5 pt-5 rounded shadow-sm text-center" style={{ backgroundColor: "#E6E0F8", border: "solid 1px #F8F8F8",maxWidth:"750px", marginTop:"200px"}}>
                          <h1 className="fw-bold mt-2 mx-4 mb-3">Recommendations for You</h1>
                          <div>
                            <hr style={{color:"gray"}}/>
                            <h5 className="fw-bold mx-4 text-start">Recommended Clothing Previews</h5>
                            <hr style={{color:"gray"}}/>
                            <div>
                              <div class="container text-center mb-5" style={{marginBottom:"100px"}}>
                              <div class="row mx-4" style={{marginBottom:"150px"}}>
                                  <div class="col">
                                    <div class="card" style={{width:"100px",height:"50px", border: "solid 1px #F8F8F8"}}>
                                      <img src={img} class="card-img-top" alt="..."/>
                                        <div class="bg-white rounded-bottom">
                                          <p class="card-text mt-1 mb-1">Tank Top</p>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="card" style={{width:"100px",height:"50px",border: "solid 1px #F8F8F8"}}>
                                      <img src={img} class="card-img-top" alt="..."/>
                                        <div class="bg-white rounded-bottom">
                                          <p class="card-text mt-1 mb-1">Tank Top</p>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="card" style={{width:"100px",height:"50px",border: "solid 1px #F8F8F8"}}>
                                      <img src={img} class="card-img-top" alt="..."/>
                                        <div class="bg-white rounded-bottom">
                                          <p class="card-text mt-1 mb-1">Tank Top</p>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="card" style={{width:"100px",height:"50px",border: "solid 1px #F8F8F8"}}>
                                      <img src={img} class="card-img-top" alt="..."/>
                                        <div class="bg-white rounded-bottom">
                                          <p class="card-text mt-1 mb-1">Tank Top</p>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <hr className="mt-4" style={{color:"gray"}}/>
                            <h5 className="fw-bold mx-4 text-start">Recommended Fabrics</h5>
                            <hr style={{color:"gray"}}/>
                            <div>
                              <div class="container text-center mb-5">
                              <div class="row mx-4">
                                  <div class="col" style={{width:"10px",height:"15px"}}>Linen</div>
                                  <div class="col" style={{width:"10px",height:"15px"}}>Linen</div>
                                  <div class="col" style={{width:"10px",height:"15px"}}>Linen</div>
                                  <div class="col" style={{width:"10px",height:"15px"}}>Linen</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <hr style={{color:"gray"}}/>
                            <h5 className="fw-bold mx-4 text-start">Recommended Colors</h5>
                            <hr style={{color:"gray"}}/>
                            <div>
                              <div class="container text-center mb-3">
                                <div class="row mx-4">
                                  <div class="col" style={{backgroundColor:"red",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"blue",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"red",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"blue",width:"10px",height:"35px"}}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <hr style={{color:"gray"}} className="mt-5"/>
                            <h5 className="fw-bold mx-4 text-start">Recommended Patterns</h5>
                            <hr style={{color:"gray"}}/>
                            <div>
                              <div class="container text-center mb-5">
                              <div class="row mx-4">
                                  <div class="col" style={{backgroundColor:"red",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"blue",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"red",width:"10px",height:"35px"}}></div>
                                  <div class="col" style={{backgroundColor:"blue",width:"10px",height:"35px"}}></div>
                              </div>
                              </div>
                            </div>
                          </div>
                              


                         </div>
                    </div>
              </div>

                {/* <Previews/>
                <Fabrics/>
                <Colors/>
                <Patterns/> */}
                
            
              </div>           
      </>
    )
    }
    export default Recommendations    