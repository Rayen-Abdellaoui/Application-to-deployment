import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BiHome } from "react-icons/bi";
import { BsCalendar4Event } from "react-icons/bs";
import { GrWorkshop } from "react-icons/gr";
import { GiHelp } from "react-icons/gi";
import { BsCalendar2Date } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { IoIosAddCircleOutline } from "react-icons/io";
import logo from './logo.svg';
import Signin from '../Modals/Signin';
import { useEffect, useState } from 'react';
import Logout from '../Modals/Logout';



function AppNavbar(props){
    
        
    return(
        <>
            <Navbar sticky="top" expand="lg">
                <Container>
                    <Navbar.Brand className="nav-brand" href="/"><img src= {logo} alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle  className='toggler' aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto coll">
                            
                            <Nav.Link href="/"><BiHome /> Home</Nav.Link>
                            {props.role == "User" ? (<Nav.Link href="/myworkshop">< BsCalendar2Date /> My WorkShops</Nav.Link>) : (<></>)} 
                            {props.role == "Club" ? (<Nav.Link href="/club-workshop"><BsCalendar4Event /> My WorkShop</Nav.Link>) : (<></>)}
                            {props.role == "Club" ? (<Nav.Link href="/add-workshop"><IoIosAddCircleOutline /> Add WorkShop</Nav.Link>) : (<></>)} 
                            <Nav.Link href="/workshops/1"><GrWorkshop /> Workshops</Nav.Link>
                            {props.role == "User" ? (<Nav.Link href="/account"><RiContactsLine /> Account</Nav.Link>) : 
                            (<></>)}     
                            {props.user? (<></>) : (<Nav.Link href="/contact">< LiaTelegramPlane /> Contact</Nav.Link>)}                 
                            <Nav.Link href="about"><GiHelp /> About</Nav.Link>
                        </Nav>
                        {props.user ? (<> <Logout /> </>) : 
                            (                       
                                 <div className= "sub">
                                    <Signin />
                                </div>)} 
   
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    );
}

export default AppNavbar;