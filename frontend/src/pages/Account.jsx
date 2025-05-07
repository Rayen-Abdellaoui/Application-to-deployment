import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody,MDBCardText,MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Account.css'
import '../Components/Modals/Modal.css'
import ImageUpload from '../Components/ImageUpload';
import { useState, useEffect } from 'react';
import axios from 'axios';



function Account() {

  const [firstname,setFirstname] = useState();
  const [lastname,setLastname] = useState();
  const [phone,setPhone] = useState();
  const [password,setPassword] = useState();
  const [user_info,setUserinfo] = useState();
  const [username,setUsername] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [profile_img ,setProfileimg] = useState();

  const handleChangephoto =  (e) =>{
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_URL}/api/user-profile-pic`,{profile_img},{
      headers: { 
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    .then(result => {
        if(result.status == 200){
          console.log(result.data);
          window.location.reload();
        }

    })
    .catch(err => console.log(err));
}


  useEffect(() => {
      const fetchWorkshops = async () => {
          setisLoading(true);
      try {
          const response = await axios.get(`http://${process.env.API_URI}:5555/api/username-account`,{ withCredentials: true });
          if(response.status == 200){
            setUsername(response.data);
            console.log(response);
          }
      } catch (err) {
          console.error('Error fetching user info', err);
      }
      finally{
          setisLoading(false);
      }
      };

      fetchWorkshops();
  }, []);



  

  const handleUpdate =  (e) =>{
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/api/user-account`,{firstname,lastname,phone,password,profile_img},{
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
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white align-items-center"
                    style={{ backgroundColor: "#a08ae8", borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem',
                    display:"flex",flexDirection:"column"}}>
                    <div className="relative h-96 w-96 m-8" style={{outerHeight:"5%",innerHeight:"5%"}}>
                      <img 
                          style={{width : "150px",height:"150px",borderRadius:"50%",margin:"5px"}} 
                          src={`../../uploads/${username[4]}`} 
                          alt="profile pic" 
                      /> 
                    </div>                      
                    <div style={{display:"flex",flexDirection:"column",alignItems:"start",width:"80%"}}>
                        <MDBCardText style={{fontFamily :"Rubik",fontSize : "0.9rem",fontWeight:"bold"}}> <span style={{fontSize:"1.3rem",color:"#45347d"}}>Firsname :</span>  {username[0]}</MDBCardText>
                        <MDBCardText style={{fontFamily :"Rubik",fontSize : "0.9rem",fontWeight:"bold"}}> <span style={{fontSize:"1.3rem",color:"#45347d"}}>Lastname :</span>  {username[1]}</MDBCardText>                    
                        <MDBCardText style={{fontFamily :"Rubik",fontSize : "0.9rem",fontWeight:"bold"}}> <span style={{fontSize:"1.3rem",color:"#45347d"}}>Email : </span> {username[2]}</MDBCardText>
                        <MDBCardText style={{fontFamily :"Rubik",fontSize : "0.9rem",fontWeight:"bold"}}> <span style={{fontSize:"1.3rem",color:"#45347d"}}>Phone : </span> {username[3]}</MDBCardText>
                      </div>
                  </MDBCol>
                  <MDBCol md="8" style={{backgroundColor:"#f0eeed"}}>
                    <MDBCardBody className="p-4">
                      <MDBTypography style={{fontFamily :"Rubik",fontSize : "1.5rem",fontWeight:"bold",color:"black"}} tag="h6">Account Details</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <form >
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                            
                                <FloatingLabel controlId="floatingInput" label="FirstName"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setFirstname(e.target.value)}  type="name" placeholder="FirstName" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel  controlId="floatingInput" label="LastName"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setLastname(e.target.value)} type="Surname" placeholder="LastName" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }}>
                        <MDBCol size="6" className="mb-3" style={{  }}>
                          <FloatingLabel controlId="floatingInput" label="Phone"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setPhone(e.target.value)} type="Phone" placeholder="Phone" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="floatingInput" label="Password"  >
                                    <Form.Control style={{border:"solid 2px"}} onChange={(e) => setPassword(e.target.value)} type="Password" placeholder="Password" />
                                </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                        <MDBCol size="6" className="mb-3">
                          <FloatingLabel controlId="floatingInput" label="Profile Picture"  >
                            <Form.Control style={{border:"solid 2px"}}type="file" name="profile_img" id="profile_img" onChange={(e) =>{setProfileimg(e.target.files[0])}}  placeholder="Profile Picture" />
                          </FloatingLabel>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow className="pt-1" style={{marginBottom :"10px" ,display:"flex",justifyContent:"center" }} >
                          <MDBCol size="6" className="mb-3">
                            <button onClick={handleUpdate}  className="btn1 primary raised" style={{width:"100%",minWidth :"200px",backgroundColor :"#18122B",fontFamily :"Rubik",fontSize : "1.1rem",fontWeight:"bold"}}>Update</button>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
   
    </>
  );
}

export default Account;