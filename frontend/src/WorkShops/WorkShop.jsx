import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import '/src/Components/WorkShop_Card/WorkShop_Card.css';
import { FaSchool } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function WorkShop(props){
  const [workshop, setWorkshop] = useState([]);
  const [buttonstatus, setButtonstatus] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [pic, setPic] = useState(false);
  const workshopId  = useParams();


  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workshop/${workshopId.id}`,{ withCredentials: true });
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/checksubscription/${workshopId.id}`,{ withCredentials: true })
        if(response.data.participants == response.data.max_participants){
          setButtonstatus(true)
        }
        setWorkshop(response.data);
        const result1 = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubimg/${response.data.club}`,{ withCredentials: true })
        if(result1.status == 200){
          setPic(result1.data);
        }
        if(result.status == 200 || result.status == 206){
          setSubscription(false)
        }
        else{
          setSubscription(true);
        }
      } catch (err) {
        console.error('Error fetching workshops', err);
      }
    };

    fetchWorkshops();
  }, []);

  const handleSubscribtion = async (e) =>{
    e.preventDefault()
    await axios.get(`${import.meta.env.VITE_API_URL}/api/subscription/${workshopId.id}`,{ withCredentials: true })
    .then(result =>{
      if(result.status == 201){
        setButtonstatus(true);
      }
      else if(result.status == 202){
        setSubscription(false);
        window.location.reload();
      }
      else if(result.status == 207){
        toast('Login First', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
          style :{
            width : "fit-content",
            fontFamily : "Kanit"
          },
          closeButton : <button style={{display :"none"}}></button>
          });
      }
      else{
        window.location.reload();
        setSubscription(true);
      }
    })
    .catch(err => console.log(err));
  }


  let button;
  if(props.role === "Club"){
    button = <MDBBtn style={{ fontSize: "1.3rem" }} className="card-button" disabled>Must Be user</MDBBtn>;
  }
  else if (buttonstatus) {
    button = <MDBBtn style={{ fontSize: "1.3rem" }} className="card-button" disabled>Workshop is Full</MDBBtn>;
  } else if (subscription) {
    button = <MDBBtn onClick={handleSubscribtion} className="card-button" >Cancel</MDBBtn>;
  } else {
    button = <MDBBtn onClick={handleSubscribtion} className="card-button">Participate</MDBBtn>;
  }

  let time;
  if(props.time <12){
    time = workshop.time + " am";
  }
  else{
    time = workshop.time + " pm";
  }

  return(
        <>
          <ToastContainer />
          <div className='bg-image'>
            <img src={`/uploads/${workshop.image}`} className='img-fluid' style={{width : "100%",maxHeight : "1000px" }} alt='Sample' />
            <div className='mask d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <div className='d-flex justify-content-around align-items-center h-100 ' style={{width : "90%",flexWrap:"wrap"}}>
                <p className='text-white mb-0'>
                  <span style={{
                    fontSize : "3.5rem",
                    fontFamily : "Rubik",
                    fontWeight : "500"
                  }}>{workshop.title} </span><br />
                  <span style={{
                    fontSize : "2.5rem",
                    fontFamily : "Roboto Condensed",
                    fontWeight : "400"
                  }}>Training Offered by :</span> <br />
                  <span style={{
                    fontSize : "2rem",
                    fontFamily : "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                  }}><img src={`/uploads/${pic}`}  style={{width : "40px",height : "40px",borderRadius:"10px" }} alt='Sample' />  {workshop.club} </span><br />
                  <span style={{
                    fontSize : "2rem",
                    fontFamily : "Roboto Condensed",
                    fontWeight : "400"}}> Presented By : </span> <br />
                    <span style={{
                      fontSize : "2rem",
                      fontFamily : "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }}><CgProfile/> {workshop.trainers}</span>
                    

                </p>
                <MDBCard style={{width : "40%", height : "fit-content",backgroundColor : "#cdc7c3"}}>
                  <MDBCardImage src={`/uploads/${workshop.image}`} position='top' alt='...' height={270} />
                  <MDBCardBody className="fn">
                    <MDBCardText  className="card-content flex-wrap">
                    <p style={{
                        fontSize : "1.3rem",
                        color : "black"
                      }}>{workshop.date} Time : {time}</p>
                      <p style={{
                        fontSize : "1.3rem",
                        color : "black"
                      }}>
                        <span style={{fontSize : "1.2rem",fontWeight : "bold",color : "black"}}>{workshop.participants} / {workshop.max_participants} participants</span> <br />
                        <FaSchool /> Class: {workshop.salle} <br />
                        <FaRegFlag /> {workshop.lang} <br />
                        <FaVideo /> {workshop.duration} Hours session
                      </p>
                      {button}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
        </>
    );
}

export default WorkShop;
