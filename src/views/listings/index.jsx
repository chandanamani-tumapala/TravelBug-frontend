import React,{useState, useEffect} from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Card, Button, Alert} from 'react-bootstrap';



export default function Index() {
    const navigate= useNavigate();
    const [allListings,setAllListings] = useState([]);
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        // Fetch listings
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/listings`);
                setAllListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchListing();
    }, []);

    useEffect (() => {
        if(location.state && location.state.message) {
            setAlertMessage(location.state.message);
            const timer = setTimeout(()=> {
                setAlertMessage(null);
                navigate(location.pathname, {replace:true});
            },3000);
            return ()=>clearTimeout(timer);
        }
    },[location.state,navigate, location.pathname]);


    if(!allListings){
        return (
            <h1>Loading...</h1>
        );
    }
    return (
         
        <>
        <h3>All Listings</h3>
        {alertMessage && (
        <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage}
        </Alert>
      )}
        <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
            {allListings.map(listing=>(
                <Card className='card col' style={{ width: '20rem' }} key={listing._id}>
                <Card.Img className='card-img-top' variant="top" src={listing.image.url} />
                <Card.Body className='card-body'>
                  <Card.Title className='card-title'><b>{listing.title}</b>
                    <br></br>
                    &#8377;{listing.price.toLocaleString("en-IN")} / night
                  </Card.Title>
                  <Card.Footer className='card-footer'>
                    <Button variant="primary" style={{backgroundColor:"#fe424d", borderColor:"#fe424d"}} ><Link className='Linkto' to={`/listings/${listing._id}`} >View Details</Link></Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
        </div>
        
        </>
    )
}