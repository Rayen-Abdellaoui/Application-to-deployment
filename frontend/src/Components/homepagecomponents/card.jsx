
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';


export default function Card({ title, paragraph, buttonText, onClick }) {
    
  return (
   
    <MDBCard alignment='center' style={{backgroundColor:"rgba(160, 138, 232, 0.4)" , height :"100%" }}>
      <MDBCardBody style={{paddingTop:"30%"}} >
        <MDBCardTitle >{title}</MDBCardTitle>
        <MDBCardText>{paragraph}</MDBCardText>
        <MDBBtn className="hover-blue" style={{backgroundColor : "black", color: "white"}} href='#'>{buttonText}</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}