import Modal from 'react-bootstrap/Modal';
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import logo from '../Navbar/logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import { ModalBody } from "react-bootstrap";
import './Modal.css'

function Login(props){
    return(
        <>
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    <div className='d-flex flex-row mt-2'>
                        <Navbar.Brand className="nav-brand"><img src= {logo} alt="logo" /></Navbar.Brand>
                    </div>
                    </Modal.Title>
                </Modal.Header>
                <ModalBody className=" d-flex flex-column align-items-center">
                    <p style={{fontSize:"2.5rem",fontFamily:"Fira Sans",color:"black"}}>Welcome Back</p>
                    <form action="" method="post" className="d-flex flex-column align-items-center">

                    <div className="d-flex flex-row align-items-center ">
                        <MdEmail style={{margin:"5px",fontSize:"1.7rem",color:"#18122B"}} />
                        <div className="form-outline flex-fill mb-0">
                        <input type="email" name="email" id="email"  className="login-input" placeholder="Email" required  />
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center ">
                    <HiLockClosed style={{margin:"5px",fontSize:"1.7rem",color:"#18122B"}} />
                        <div className="form-outline flex-fill mb-0">
                        <input type="password" name="password" id="password" className="login-input" placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className="sign-btn">Login</button>
                    <p style={{opacity:"0.5",color:"#18122B"}}>Forgot password?</p>

                    </form>
                </ModalBody>

            </Modal>
        </>
    );
}

export default Login;