
import React, {useState, useRef} from 'react';
import UploadingAnimation from "../../public/uploading.gif";
import './Modals/Modal.css'
import axios from 'axios';



const ImageUpload = () => {
  const [avatarURL, setAvatarURL] = useState("default_profile_image.png");

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const uploadImageDisplay = async () => {
    try {
      setAvatarURL(UploadingAnimation);
      const uploadedFile = fileUploadRef.current.files[0];
      const formData = new FormData();

      formData.append("file", uploadedFile);
      

      axios.post(`${import.meta.env.VITE_API_URL}/api/user-profile-pic`,formData,{headers: { "Content-Type": "multipart/form-data" },},{ withCredentials: true })
      .then(response =>{
        if(response.status == 200){
          setAvatarURL(response.data.profile_img);
          window.location.reload();
        }
      })

    } catch(error) {
      console.error(error);
      setAvatarURL("default_profile_image.png");
    }


  }

  return (
    <div className="relative h-96 w-96 m-8" style={{outerHeight:"5%",innerHeight:"5%"}}>
      <img style={{width : "150px",height:"150px",borderRadius:"50%",margin:"5px"}}
        src={`src/Components/WorkShop Card/uploads/${avatarURL}`} 
        alt ="Avatar"
         />

      <form id="form" encType='multipart/form-data'>
        <button
          type='submit'
          onClick={handleImageUpload}
          className='sign-btn'
          style={{width:"200px",minWidth :"100px",backgroundColor :"#18122B",fontFamily :"Rubik",fontSize : "1.0rem",fontWeight:"bold"}}>
          Change photo</button>
        <input 
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden />
      </form>  
    </div>
  )
}

export default ImageUpload
