import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import axios from 'axios';

function MyWorkshopCard(props){

    const handleDelete = () =>{
        try {
            const response =  axios.get(`${import.meta.env.VITE_API_URL}/api/delete-myworkshop/${props.id}`,{ withCredentials: true });
            window.location.reload();
        } catch (err) {
            console.error('Error fetching workshops', err);
        }
    }

    let time;
    if(props.time <12){
      time = props.time + " am";
    }
    else{
      time = props.time + " pm";
    }
    return(
        <>

<Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
      style={{border : "transparent 2px #fffff", borderRadius : "10px" , margin : "8px"}}
    >
      <Box />
      <Card
        orientation="horizontal"
        sx={{
            width: '100%',
            flexWrap: 'wrap',
            [`& > *`]: {
              '--stack-point': '500px',
              minWidth:
                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
            },
            // make the card resizable for demo
            overflow: 'auto',
            resize: 'horizontal',
          }}
        style={{backgroundColor : "#f0eeed",display:"flex"}}
      >
        <AspectRatio flex ratio="1" maxHeight={200} sx={{ minWidth: 400 }}>
          <img
            src={`/uploads/${props.image}`}
            alt="workshop_image"
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg" style={{color : "black", fontSize : "1.5rem" ,fontFamily : "Roboto Condensed"}}>
            {props.title}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {props.date} Time : {time}
          </Typography>
          <Sheet
            sx={{
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
            style={{backgroundColor : "#a08ae8"}}
            >
            <div>
              <Typography level="body-xs" fontWeight="lg" style={{color : "black", fontSize : "1.3rem" ,fontFamily : "Roboto Condensed"}}>
                Club
              </Typography>
              <Typography fontWeight="lg" style={{color:"black",fontSize:"1.1rem"}}>{props.club}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg" style={{color : "black", fontSize : "1.3rem" ,fontFamily : "Roboto Condensed"}}>
                Duration
              </Typography>
              <Typography fontWeight="lg" style={{color:"black",fontSize:"1.1rem"}}>{props.duration} Hours</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg" style={{color : "black", fontSize : "1.3rem" ,fontFamily : "Roboto Condensed"}}>
                Class
              </Typography>
              <Typography fontWeight="lg" style={{color:"black",fontSize:"1.1rem"}}>{props.salle}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', justifyContent:"space-around", flexWrap:"wrap" }}>
            <a href={`/workshop/${props.id}`}><Button     style={{margin :"3px",width:"30%",minWidth :"250px",backgroundColor :"#a08ae8",fontFamily :"Rubik",fontSize : "1.1rem",fontWeight:"bold"}}>
              View  WorkShop
            </Button></a>
            <Button onClick={handleDelete} color='danger' style={{margin :"3px",width : "30%",minWidth :"250px",fontFamily :"Rubik",fontSize : "1.1rem",fontWeight:"bold"}}>
              Delete WorkShop
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
        </>
    );
}

export default MyWorkshopCard;