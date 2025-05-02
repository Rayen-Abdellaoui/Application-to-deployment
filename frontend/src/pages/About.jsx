import "./About.css"
window.onscroll = function () {
        jet();
      };
    
      function jet() {
        var ilake = document.getElementById("head");
        ilake.style.top = "0px";
        ilake.style.position = "sticky";
      }
window.addEventListener("scroll", () => {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
          var wnd = window.innerHeight;
          var rtop = reveals[i].getBoundingClientRect().top;
          var rpoint = 100;
    
          if (rtop < wnd - rpoint) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      });
function About(){
    return(
        <div>
                <div id="front">
                        
                <h1 style={{ textAlign: "center" }}>Welcome, to WorkShopWise</h1>
                
                <img
                src="aboutus1.jpg"
                alt="font"
                />
                <p>
                "Forget scheduling struggles! Our platform makes booking workshops a breeze. 
                Find what you want, enroll in seconds, and focus on learning. We connect you 
                with workshops to expand your skills, no matter your level."
                </p>
                </div>
                
                <div id="first" className="reveal">
                        <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/growing-business-by-digital-marketing-4217800-3501667.png"
                        alt=""
                        />
                        <div>
                        <h1>We Offer Innovative Learning Solutions</h1>
                        <p>
                        Workshopwise empowers you to learn by doing . 
                        We offer a vast selection of workshops across various fields,
                         making it simple to find and book the perfect fit for your skillset.
                          From beginners to lifelong learners, Workshopwise connects you with 
                          inspiring workshops to fuel your academic growth.
                        </p>

                        </div>
                </div>

                <div id="fourth" className="reveal">
                <h2 style={{ color: "white" }}>WORSHOP CATEGORY</h2>
                <h1 style={{ color: "white" }}>
                Our Workshops Mainly Discuss These Following Topics :
                </h1>
                <div id="fourth_cards">
                <div>
                <img
                        src="https://cdn.iconscout.com/icon/premium/png-64-thumb/data-analysis-27-681042.png"
                        alt=" "
                />
                <p>DATA ANALYTICS</p>
                </div>
                <div>
                <img
                        src="https://cdn.iconscout.com/icon/premium/png-64-thumb/ui-ux-designer-2755964-2289563.png"
                        alt=" "
                />
                <p>UI/UX DESIGN</p>
                </div>
                <div>
                <img
                        src="https://cdn.iconscout.com/icon/premium/png-64-thumb/web-development-3-478143.png"
                        alt=" "
                />
                <p>WEB DEVELOPEMENT</p>
                </div>
                <div>
                <img
                        src="https://cdn.iconscout.com/icon/premium/png-64-thumb/qa-testing-3919162-3246433.png"
                        alt=" "
                />
                <p>DEVOPS</p>
                </div>
                <div>
                <img
                        src="https://cdn.iconscout.com/icon/premium/png-64-thumb/team-135-386667.png"
                        alt=" "
                />
                <p>HUMANITARIAN ACTS</p>
                </div>
                </div>
                </div>

                <div id="third" className="reveal">
                <div class="py-5 team4">
                        <div class="container">
                        <div class="row justify-content-center mb-4">
                        <div class="col-md-7 text-center">
                                <h3 class="mb-3">Our Team : </h3>
                                <h6 class="subtitle">  </h6>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-lg-3 mb-4">
                                <div className="row">
                                <div className="col-md-12">
                                <img src="RA.png" alt="wrapkit" className="img-fluid rounded-circle" />
                                </div>
                                <div className="col-md-12 text-center">
                                <div className="pt-2">
                                <h5 className="mt-4 font-weight-medium mb-0">Rayen Abdellaoui</h5>
                                <ul className="list-inline">
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-behance"></i></a></li>
                                </ul>
                                </div>
                                </div>
                                </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                                <div className="row">
                                <div className="col-md-12">
                                <img src="RH.png" alt="wrapkit" className="img-fluid rounded-circle" />
                                </div>
                                <div className="col-md-12 text-center">
                                <div className="pt-2">
                                <h5 className="mt-4 font-weight-medium mb-0">Rayen Heni</h5>
                                
                                <ul className="list-inline">
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-behance"></i></a></li>
                                </ul>
                                </div>
                                </div>
                                </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                                <div className="row">
                                <div className="col-md-12">
                                <img src="AG.png" alt="wrapkit" className="img-fluid rounded-circle" />
                                </div>
                                <div className="col-md-12 text-center">
                                <div className="pt-2">
                                <h5 className="mt-4 font-weight-medium mb-0">Ayoub Gharbi</h5>
                                <ul className="list-inline">
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-decoration-none d-block px-1"><i className="icon-social-behance"></i></a></li>
                                </ul>
                                </div>
                                </div>
                                </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                                <div class="row">
                                <div class="col-md-12">
                                <img src="ES.png" alt="wrapkit" class="img-fluid rounded-circle" />
                                </div>
                                <div class="col-md-12 text-center">
                                <div class="pt-2">
                                <h5 class="mt-4 font-weight-medium mb-0">Ela Said</h5>
                                <ul class="list-inline">
                                        <li class="list-inline-item"><a href="#" class="text-decoration-none d-block px-1"><i class="icon-social-facebook"></i></a></li>
                                        <li class="list-inline-item"><a href="#" class="text-decoration-none d-block px-1"><i class="icon-social-twitter"></i></a></li>
                                        <li class="list-inline-item"><a href="#" class="text-decoration-none d-block px-1"><i class="icon-social-instagram"></i></a></li>
                                        <li class="list-inline-item"><a href="#" class="text-decoration-none d-block px-1"><i class="icon-social-behance"></i></a></li>
                                </ul>
                                </div>
                                </div>
                                </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>

        </div>
    );
}

export default About;