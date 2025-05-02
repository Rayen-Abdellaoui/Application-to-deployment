import logoo from './vid1.mp4';
import Butn from './buttncomp'

function HomeVid() {
    return (

        <div className='bg-image hover-overlay'>
        <video autoPlay muted loop  className='img-fluid' alt='Sample' style={{width:"100%", height:"800px"}}>
      <source src={logoo} type="video/mp4" />
    </video>
        <div className='mask overlay' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', alignItems: 'center', justifyItems: 'center' }}>
            <h1 className='text-white mb-0'style={{color:"black",fontSize:"64px"}}>Get started today with workshopwise</h1>
            <a href="/workshops/1"><Butn /></a>
          </div>
          </div>
        </div> 
      </div>
    );

}
export default HomeVid