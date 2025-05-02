import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody,MDBCardText, MDBTypography } from 'mdb-react-ui-kit';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../pages/Account.css'
import './Modals/Modal.css'
import { useState, useEffect } from 'react';
import axios from 'axios';



function Account() {

  const [title,setTitle] = useState();
  const [time,setTime] = useState();
  const [date,setDate] = useState();
  const [lang,setLang] = useState();
  const [trainers,setTrainers] = useState();
  const [duration,setDuration] = useState();
  const [salle, setSalle] = useState();
  const [max_participants ,setMaxparticipants] = useState();
  const [profile_img ,setProfileimg] = useState();



  const handleUpdate =  (e) =>{
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/api/add-workshop`,{title,date,lang,time,duration,trainers,max_participants,salle,profile_img},{
      headers: { 
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    .then(result => {
        if(result.status == 200){
          window.location.reload();
        }
    })
    .catch(err => console.log(err));
}

  return (
    <>
        <MDBContainer className="py-5 " style={{ width:'80%' }}>
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol lg="!6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '10px' }}>
                <MDBRow className="g-0" style={{backgroundColor:"#f0eeed"}}>
                    <MDBCardBody className="p-4">
                      <MDBTypography style={{fontFamily :"Rubik",fontSize : "1.5rem",fontWeight:"bold",color:"black"}} tag="h6">Add New WorkShop</MDBTypography>
                      <hr/>
                      <form >
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                                <FloatingLabel controlId="floating" label="Title"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setTitle(e.target.value)}  type="name" placeholder="Club Name" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                                <FloatingLabel controlId="2" label="Date"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setDate(e.target.value)}  type="date" placeholder="Club Name" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                                <FloatingLabel controlId="10" label="Time"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setTime(e.target.value)}  type="number" placeholder="Club Name" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                                <FloatingLabel controlId="3" label="Class"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setSalle(e.target.value)}  type="name" placeholder="Club Name" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="6" label="Trainer"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setTrainers(e.target.value)} type="name" placeholder="Password" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                                <FloatingLabel controlId="5" label="Duration"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setDuration(e.target.value)}  type="number" placeholder="Club Name" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="4" label="Language"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setLang(e.target.value)} type="name" placeholder="Password" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="8" label="Max Participants"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setMaxparticipants(e.target.value)} type="number" placeholder="Password" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="9" label="WorkShop Photo"  >
                                    <Form.Control style={{border:"solid 2px"}} name="profile_img" id="profile_img" onChange={(e) =>{setProfileimg(e.target.files[0])}} type="file" placeholder="Password" />
                          </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                            <button onClick={handleUpdate}  className="btn1 primary raised" style={{width:"100%",minWidth :"200px",backgroundColor :"#18122B",fontFamily :"Rubik",fontSize : "1.1rem",fontWeight:"bold"}}>Add WorkShop</button>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </MDBCardBody>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
   
    </>
  );
}

export default Account;