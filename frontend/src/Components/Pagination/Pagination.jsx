import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import './Pagination.css';


function Pagination(){

    return(
        <>
            <nav className="d-flex  justify-content-center" style={{fontFamily :"Rubik" ,color :"black",backgroundColor:"#a08ae8",width:"400px",borderRadius:"30px"}}>
            <MDBPagination size="lg" circle className='mb-0'>
                <MDBPaginationItem className='pag-item'>
                <MDBPaginationLink className='pag-link' href='#' tabIndex={-1} aria-disabled='true'>
                    <GrPrevious />
                </MDBPaginationLink>
                </MDBPaginationItem >
                <MDBPaginationItem className='pag-item ' >
                <MDBPaginationLink className='pag-link'  href='1'>1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem className='pag-item'>
                <MDBPaginationLink className='pag-link'href='2'>2</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem className='pag-item'>
                <MDBPaginationLink className='pag-link' href='3' >3</MDBPaginationLink>
                </MDBPaginationItem >
                <MDBPaginationItem className='pag-item'>
                <MDBPaginationLink className='pag-link' href='#'><GrNext /></MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
            </nav> 
        </>
    );
}

export default Pagination;