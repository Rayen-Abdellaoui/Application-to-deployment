import WorkShop_Card from "../Components/WorkShop_Card/WorkShop_Card";
import Pagination from "../Components/Pagination/Pagination";
import { MDBContainer } from 'mdb-react-ui-kit';
import { MDBCol } from 'mdb-react-ui-kit';
import { Routes,Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';



function WorkShop(){
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setisLoading] = useState(false);
   

  useEffect(() => {
    const fetchWorkshops = async () => {
        setisLoading(true);
      try {
        const response = await axios.get(`/api/workShops`);
        setWorkshops(response.data);
        console.log(workshops);
      } catch (err) {
        console.log('Error fetching workshops', err);
      }
      finally{
        setisLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  if(isLoading){
    return(
        <>
        <div>Is loo</div>
        </>
    );
  }


    return(
        <>
            <Routes>
            <Route path="/"  element={
                <MDBContainer className="d-flex flex-column align-items-center ">
                <div className="d-flex align-items-center justify-items-center " style={{
                                    flexWrap : "wrap",
                                    width:"fit-content"
                                    }} >
                    {workshops.map((workshop) =>(
                        <MDBCol key={workshop._id}>
                          <WorkShop_Card 
                            title={workshop.title} 
                            duration={workshop.duration}
                            club={workshop.club}
                            date={workshop.date}
                            lang={workshop.lang}
                            salle={workshop.salle}
                            time={workshop.time}
                            participants={workshop.participants}
                            image={workshop.image}
                            id={workshop._id}
                          />
                        </MDBCol>
                    ))}


                </div>
                
                </MDBContainer>
            } />
            <Route path="2"  element={
                <MDBContainer className="d-flex flex-column align-items-center ">
                <div>
    
                </div>
                <div className="d-flex align-items-center  mb-3" style={{display : "flex",
                                    flexWrap : "wrap",
                                    width : "100%"}} >
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol><WorkShop_Card /></MDBCol>
                </div>
                <div className="d-flex align-items-center  mb-3" style={{display : "flex",
                                    flexWrap : "wrap",
                                    width : "100%"}} >
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol><WorkShop_Card /></MDBCol>
                </div>
                
                </MDBContainer>
            } />
            <Route path="3"  element={
                <MDBContainer className="d-flex flex-column align-items-center ">
                <div>
    
                </div>
                <div className="d-flex align-items-center  mb-3" style={{display : "flex",
                                    flexWrap : "wrap",
                                    width : "100%"}} >
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol><WorkShop_Card /></MDBCol>
                </div>
                <div className="d-flex align-items-center  mb-3" style={{display : "flex",
                                    flexWrap : "wrap",
                                    width : "100%"}} >
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol ><WorkShop_Card /></MDBCol>
                    <MDBCol><WorkShop_Card /></MDBCol>
                </div>
                
                </MDBContainer>
            } />
            </Routes>
            
           
        </>
    );
}

export default WorkShop;