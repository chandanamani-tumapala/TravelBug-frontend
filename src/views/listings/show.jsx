import React, {useState, useEffect} from 'react';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';
import {Row, Card,Button,Alert, Container,Form, CardText, CardTitle} from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import MapComponent from '../layouts/mapcomponent';
const token= localStorage.getItem('jwtToken');

export default function Show() {
    const {id} = useParams();
    const navigate= useNavigate();
    const [listing, setListing]= useState(null);
    const [reviewdata, setReviewData] = useState({ rating: '', comment: '' });
    const [validated,setValidated]= useState(false);
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState(null);
    const user= JSON.parse(localStorage.getItem('user'));
    console.log("user is ", user);


    useEffect(()=> {
        if(location.state && location.state.message) {
            setAlertMessage(location.state.message);
            const timer= setTimeout(()=> {
                setAlertMessage(null);
                navigate(location.pathname, { replace: true });
            },3000);
            return () =>clearTimeout(timer);
            
        }
    },[location.state,navigate,location.pathname]);
    useEffect(() =>{
        
        const fetchListing = async () =>{
            try {
                const response= await axios.get(`http://localhost:8080/listings/${id}`);
                setListing(response.data);
            }
            catch(err) {
                console.error('Error Fetching the listing: ', err);
            }
        };
        fetchListing();

       
    },[id]);


    const handlereview = async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity()===false) {
            event.stopPropagation();
            setValidated(true);
        }
        else {
        try {
            console.log('review is :');
            const response = await axios.post(`http://localhost:8080/listings/${id}/reviews`, reviewdata,{headers: {'Authorization': `Bearer ${token}`}})
            console.log("Review submitted", response);
            setReviewData({ rating: '', comment: '' });
            setValidated(false);
            navigate(`/listings/${id}`,{ state: { message: 'review created successfully!' } });
            window.location.reload(); 
            
        }
        catch(err) {
            console.error("error is :", err);
        }
    }
    }


    const deletelisting=async (event)=> {
        event.preventDefault();
        try {
            console.log(`id is: ${id}`);
            const response = await axios.delete(`http://localhost:8080/listings/delete/${id}`,{headers: {'Authorization': `Bearer ${token}`}})
            navigate('/index',{ state: { message: 'Listing deleted successfully!' } });
            console.log("route is deleted", response.data);
        }
        catch(err) {
            console.error("error is: ", err);
        }
    }

    if(!listing) {
        return <div>Loading...</div>
    }
    const deletereview=async ( reviewid) => {
        try {
            const response= await axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewid}`,{headers: {'Authorization': `Bearer ${token}`}})
            console.log('deleted review', response);
            // setListing(prevListing => ({
            //     ...prevListing, reviews: prevListing.reviews.filter(review=> review._id!==reviewid)
            // }))
            navigate(`/listings/${id}`,{ state: { message: 'review deleted successfully!' } });
            window.location.reload();
 
        }
        catch(err) {
            console.error("error is :",err);
        }
 
    }
    const handleonchange= (event) => {
        const {name,value} = event.target;
        setReviewData({...reviewdata, [name]:value});
    } 
    const onStarClick = (nextValue) => {
        setReviewData({ ...reviewdata, rating: nextValue });
    }
    return (
        <>
        {alertMessage && (
        <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage}
        </Alert>
      )}

        <Container className='show align-items-center' >
            <Row className='justify-content-center align-items-start'>
        <Card style={{ width: '40rem', border: '1px solid #ddd' }}>
        <h3>{listing.title}</h3>
        <Card.Img className='card-img-top' variant="top" src={listing.image.url} style={{height:'25rem',width:'100%', objectFit:'contain' , marginBottom: '15px'}} />
            <Card.Body>
                <Card.Text>Owned By:<i><b>{listing.owner.username}</b></i><br></br>{listing.description}<br/>{listing.location},<br/>{listing.country}</Card.Text>
                <Card.Subtitle className='mb-2 text-muted'>&#8377;{listing.price.toLocaleString("en-IN")}</Card.Subtitle>
                { user.id===listing.owner._id && (
               <>
                <Button variant='success' style={{marginRight: '15px'}}><Card.Link href={`/listings/${listing._id}/edit`} style={{color:'white',textDecoration:'none'}}>Edit the Listing</Card.Link></Button>
                <Button variant= 'dark' ><Card.Link href='#' onClick={deletelisting} style={{color:'white',textDecoration:'none'}}>Delete this Listing</Card.Link></Button>
                    </>
                )}
            </Card.Body>
        </Card>
        </Row>
        <Row className= 'justify-content-center align-items-start'>
        <div  style={{ marginTop: '20px', width:'40rem'}}>
        <hr />
        {user && (<>
        <h4>Leave a Review</h4>
        <Form noValidate validated={validated} onSubmit={handlereview}>
            <Form.Group className='mb-3' controlId='rating'>
                <Form.Label>Rating:  </Form.Label>
                <br/>
                <StarRatings
                rating={Number(reviewdata.rating)}
                starRatedColor="gold"
                changeRating={onStarClick}
                numberOfStars={5}
                name='rating'
             />
                <Form.Control.Feedback type='invalid'>
                    Please Provide a rating.
                </Form.Control.Feedback>

            </Form.Group>
            <Form.Group className='mb-3' controlId='comment'>
                <Form.Label>Comments</Form.Label>
                <Form.Control
                    as='textarea'
                    name='comment'
                    value= {reviewdata.comment}
                    onChange={handleonchange}
                    rows={4}
                    required
                    isInvalid={validated && !reviewdata.comment}
                    />
                <Form.Control.Feedback type='invalid'>
                    Please provide a comment.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Button variant='dark' type='submit'>Submit Review</Button>
        </Form>
        </>
        )}
        <hr/>
        <h4>All Reviews</h4>
        <div className='row-cols-2 row'>
        {listing.reviews && listing.reviews.length > 0 ? (
              listing.reviews.map((review) => (
                <Card className= 'review-card col-5' style={{ padding:'10px'}} key ={review._id}>
                    <CardTitle>@{review.author.username}</CardTitle>
                    <CardText> 
                    <StarRatings
                        rating={Number(review.rating)}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="5px"
                        editing={false} // Disable editing
                                            />
                         <br></br> 
                    Comment: {review.comment}
                    </CardText>
                    {user.id === review.author._id && (                   
                         <Button variant= 'dark' ><Card.Link href='#' onClick={()=>deletereview(review._id)} style={{color:'white',textDecoration:'none'}}>Delete Review</Card.Link></Button>
                    )}
                </Card>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
        </div>
    </div>
    </Row>
    <Row className= 'justify-content-center align-items-start'>
    <div  style={{ marginTop: '20px', width:'40rem'}}>
        <h3>Where you'll be</h3>
        <MapComponent location={listing.location} country= {listing.country}/>
    </div>
    </Row>
    <hr/>
        </Container>
        </>
    )
}