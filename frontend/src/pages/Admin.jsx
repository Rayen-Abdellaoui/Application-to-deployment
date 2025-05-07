import { useState } from 'react';
import axios from 'axios';
import { MDBContainer } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";





export default function Admin() {
  const [club_img ,setClubimg] = useState("");
  const [allImage, setAllImage] = useState();
  const [club_name,setClubname] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const handleSignin =  (e) =>{
    e.preventDefault();
    const formData = new FormData();
    axios.post(`${import.meta.env.VITE_API_URL}/api/club/sign-in`,{club_name,club_img,email,password},{headers: { "Content-Type": "multipart/form-data" },})
    .then(result => {
        if(result.data === "Email already used"){
          console.log(result.data)
          toast('Email already used', {
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
          console.log(result);
          window.location.reload();
        }
    })
    .catch(err => console.log(err));
}





  return (
    <>
      <ToastContainer />
      <MDBContainer >
        <form onSubmit={handleSignin}>
          <input onChange={(e) => setClubname(e.target.value)} type="text" name='club_name' placeholder='Name' />
          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Email' />
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password'/>
          <input onChange={(e) => setClubimg(e.target.files[0])} type="file" name="club_img" id="club_img" />
          <button type='submit'>Submit</button>
        </form>
        {allImage
          ? allImage.map( data => (
            (<img
              key={data._id}
              src={`../../public/uploads/${data.workshop_img}`}
              height={200}
              width={400}
              alt='img'
            />)
          ))
          : (<></>) }
      </MDBContainer>
    </>
  );
}