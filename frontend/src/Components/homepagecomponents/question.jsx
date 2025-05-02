import Acc from "./accordion"
import Stock from "./faqGraphic.jpeg"
import "./homep2.css"


export default function Colapssables(){
    return(
        <section className="faq-section section-padding reveal" id="section_4">
        <div className="container " >
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="mb-4">Frequently Asked Questions</h2>
            </div>
  
            <div className="clearfix"></div>
  
            <div className="col-lg-5 col-12">
              <img src={Stock} className="img-fluid" alt="FAQs" />
            </div>
  
            <div className="col-lg-6 col-12 m-auto">
              <div className="accordion" id="accordionExample">
                <Acc />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  const FaqItem = ({ question, answer }) => {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading-${question}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${question}`}
            aria-expanded="false"
            aria-controls={`collapse-${question}`}
          >
            {question}
          </button>
        </h2>
        <div
          id={`collapse-${question}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading-${question}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{answer}</div>
        </div>
      </div>
    );
}