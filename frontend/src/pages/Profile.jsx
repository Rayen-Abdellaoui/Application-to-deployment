import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import './Profile.css';
import ClubAccount from '../Components/ClubAccount';
import ViewWorkShop from '../Components/EditWorkShops/ViewWorkShop';
import AddWorkShop from '../Components/AddWorkShop';
import {useEffect,useState} from 'react';

function Profile(){
    const [length, setLength] = useState(false);

    useEffect(() => {
        const fetchWorkshops = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workshopslength`,{ withCredentials: true });
            if(response.status == 200){
                setLength(true);
            }
            else{
                setLength(false);
            }
            console.log(response);
        } catch (err) {
            console.error('Error fetching workshops', err);
        }
        };

        fetchWorkshops();
    }, []);
    return(
        <>
        <div style={{display:"flex"}}>
            <div style={{ marginTop : "0px",width:"250px",height:"500px",backgroundColor:"#18122B",borderRadius:"2px"}}>
                <Sidenav style={{height:"100%",backgroundColor:"#18122B",borderRadius:"20px",display:"flex",justifyContent:"center"}} defaultOpenKeys={['1']}>
                <Sidenav.Body style={{backgroundColor:"#18122B"}}>
                    <Nav style={{backgroundColor:"#18122B"}} activeKey="1">
                    <Nav.Item style={{backgroundColor:"#18122B",color:"white"}}  eventKey="1" icon={<DashboardIcon />} className='sidenl'>
                        Club Profile
                    </Nav.Item>
                    <Nav.Item eventKey="2" style={{backgroundColor:"#18122B" ,color:"white"}}  icon={<DashboardIcon />} className='sidenl'>Add WorkShop</Nav.Item>
                        <Nav.Item eventKey="3" style={{backgroundColor:"#18122B",color:"white"}}  icon={<DashboardIcon />} className='sidenl'>View My WorkShops</Nav.Item>
                        <Nav.Item eventKey="4" style={{backgroundColor:"#18122B",color:"white"}}  icon={<DashboardIcon />} className='sidenl'>Edit WorkShops</Nav.Item>
                    </Nav>
                </Sidenav.Body>
                </Sidenav>
            </div>
            <AddWorkShop />
            {length? (<> <ViewWorkShop /> </>) : 
                (<p>gg</p>)} 
        </div>
        </>
    );
}

export default Profile;