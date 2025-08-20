import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
const API_URL = 'https://travelbug-backend.onrender.com'
const token = localStorage.getItem('jwtToken');

export default function Edit() {
    const navigate= useNavigate();
    const {id} = useParams();
    const [formData, setFormDate]= useState(null);
    useEffect(()=> {
        const fetchListing= async() => {
            try {
                const response = await axios.get(`http://localhost:8080/listings/${id}`);
                setFormDate(response.data);
            }
            catch(err) {
                console.error('Error fetching the listing:', err);
            }
        };
        fetchListing();
    },[id]);

    //edit function 
    const handleSubmit= async (event) => {
        event.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('image', formData.image);  // appending the file
            data.append('price', formData.price);
            data.append('country', formData.country);
            data.append('location', formData.location);
            const response= await axios.put(`http//localhost:8080/listings/${id}`,data,{headers: {'Authorization': `Bearer ${token}`}});
            console.log("From Submitted:", response.data);
            navigate('/index');
        }
        catch (err) {
            console.log(err);
        }

    }

    //if data is not loaded
    if(!formData) {
        return<div>Loading...</div>
    }

    const handlefilechange= (event) => {
        setFormDate({...formData, "image":event.target.files[0]});
    }
    //handle change
    const handleChange= (event) => {
        const {name,value} = event.target;
        setFormDate({...formData, [name]:value});
    }

    return (
        <>
            <Container className='form'>
            <div className="form-container">
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <h3>Edit Your Listing</h3>
                    <br />
                    
                    <Form.Group as={Row} controlId="formTitle">
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter title"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Title </div>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formDescription" className="mt-3">
                        <Form.Label column sm={2}>
                            Description:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                required
                            />
                           <div className='invalid-feedback'>Enter Valid Description </div>

                        </Col>
                    </Form.Group>
                    <div className='mb-3'>
                        Original Listing Image:
                        <br></br>
                        <img src={formData.image.url} alt='img' style={{height: '200px', width: '200px'}}/>
                    </div>
                    <Form.Group as={Row} controlId="formImage" className="mt-3">
                        <Form.Label column sm={2}>
                            Image URL:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handlefilechange}
                                placeholder="Enter image URL/Link"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPrice" className="mt-3">
                        <Form.Label column sm={2}>
                            Price:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Price</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formCountry" className="mt-3">
                        <Form.Label column sm={2}>
                            Country:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter country"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Country Name </div>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formLocation" className="mt-3">
                        <Form.Label column sm={2}>
                            Location:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Location Address</div>
                        </Col>
                    </Form.Group>

                    <Button variant="Default" type="submit" className="mt-4" style={{ backgroundColor: '#fe424d', color: 'white' }}>
                        Update
                    </Button>
                </Form>
            </div>
        </Container>
        </>
    );
}