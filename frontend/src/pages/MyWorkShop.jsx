import MyWorkshopCard from "../Components/MyWorkShopCard/MyWorkShopCard";
import { MDBContainer } from 'mdb-react-ui-kit';
import { MDBRow } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../public/emptypage.jpg'



function MyWorkshop(){
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        const fetchWorkshops = async () => {
            setisLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/myworkshop`,{ withCredentials: true });
            setWorkshops(response.data);
            console.log(response);
        } catch (err) {
            console.error('Error fetching workshops', err);
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
                    {Array.isArray(workshops) && workshops.length > 0 ? (
                        workshops.map((workshop) => (
                            <MDBContainer>
                            <MDBRow key={workshop._id}>
                                <MyWorkshopCard
                                    title={workshop.title}
                                    duration={workshop.duration}
                                    club={workshop.club}
                                    date={workshop.date}
                                    salle={workshop.salle}
                                    time={workshop.time}
                                    image={workshop.image}
                                    id={workshop._id}
                                />
                            </MDBRow>
                            </MDBContainer>
                        ))
                    ) : (
                        <>
            <div className='bg-image'>
            <img src={logo} className='img-fluid' style={{width : "100%",maxHeight : "1000px" }} alt='Sample' />
            <div className='mask d-flex ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <div className='d-flex justify-content-around align-items-center h-100 ' style={{width : "100%",flexWrap:"wrap"}}>
                <p style={{fontSize:'4rem',fontFamily:'Rubik',color:'white'}}>Not Participated in Any WorkShop Yet</p>
              </div>
            </div>
          </div>
                        </>
                    )}
                   
        </>
    );
}

export default MyWorkshop;