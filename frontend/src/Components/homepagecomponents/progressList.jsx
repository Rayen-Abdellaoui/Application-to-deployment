
import "./homep2.css"
import { MDBIcon } from 'mdb-react-ui-kit';

export default function progList(){
    return(
        <section className="timeline-section section-padding reveal" id="section_3">
        <div className="section-overlay"></div>
  
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white mb-4">How does it work?</h2>
            </div>
  
            <div className="col-lg-10 col-12 mx-auto">
              <div className="timeline-container">
                <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                  <div className="list-progress">
                    <div className="inner" style={{ height: '885.828px' }} />
                  </div>
  
                  <li className="">
                    <h4 className="text-white mb-3">MANY LIFE CHANGING WORKSHOPS AWAIT</h4>
                    <p className="text-white">
                    Take a look at our collection of workshops, finding a workshop has never been easier thanks to our customizable search engine,
                    less time searching more time learning
                    </p>
                    <div className="icon-holder">
                    <MDBIcon fas icon="search" />
                    </div>
                  </li>
  
                  <li className="">
                    <h4 className="text-white mb-3">SET UP YOUR WORKSHOPS</h4>
                    <p className="text-white">
                    Try setting a workshop for your club with our simple interface,
                     simply customize the basic settings for the workshop and leave the rest to us
                    </p>
                    <div className="icon-holder">
                    <MDBIcon fas icon="calendar-day" />
                    </div>
                  </li>
  
                  <li className="">
                    <h4 className="text-white mb-3">LEARN MORE ABOUT OUR CLUBS</h4>
                    <p className="text-white">
                    Many wonderful clubs call INSAT their home, each with their own wonderful charm and amazing members.
                    Each club dedicates itself to a specific field offering a unique experience to any potential workshop participant
                    </p>
                    <div className="icon-holder">
                    <MDBIcon fas icon="users" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="col-12 text-center mt-5">
              <p className="text-white">
                want to subscribe to a workshop? <a href="#" className="btn custom-btn custom-border-btn ms-3">Get Started !</a>
              </p>
            </div>
          </div>
        </div>
      </section>

    );
}