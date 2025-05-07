import axios from "axios";
import {MDBBtn} from 'mdb-react-ui-kit';
import  './Modal.css';
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    const handleLogout =  (e) =>{
        e.preventDefault()
        axios.get(`${import.meta.env.VITE_API_URL}/api/logout`,{ withCredentials: true })
        .then(result => {
              console.log(result);
              navigate("/");
              window.location.reload();
            }
        )
        .catch(err => console.log(err));
    }
    return(
        
        <>
        <div className= "sub">
            <MDBBtn onClick={handleLogout}>Log Out</MDBBtn>
        </div>


        </>
    );
}

export default Logout;