import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
const token = localStorage.getItem('jwtToken');
export default function New() {
    const navigate= useNavigate();
    const [formData, setFormDate] = useState({
        title:'',
        description:'',
        image:'',
        price:'',
        country:'',
        location:''
    });
    const [validate, setValidate]= useState(false);
    const handleChange= (event) => {
        const{name,value}= event.target;
        setFormDate({...formData, [name]:value});
    };
    const handlefilechange= (event) => {
        setFormDate({...formData, "image":event.target.files[0]});
    }
    const handleSubmit= async (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);
        if(form.checkValidity()===true){
            event.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('image', formData.image);  // appending the file
            data.append('price', formData.price);
            data.append('country', formData.country);
            data.append('location', formData.location);
            const response = await axios.post('http://localhost:8080/listings', data, {headers: {'Authorization': `Bearer ${token}`}});
            console.log('listing created:', response.data);
            navigate('/index', { state: { message: 'Listing created successfully!'} });
        }
        catch(err) {
            console.error('Error creating the listing', err);
        }
    }
    };

    return (
        <>
        <Container className='form'>
            <div className="form-container">
            <Form noValidate validated= {validate} onSubmit={handleSubmit} encType='multipart/form-data'>
                <h2>Create New Listing </h2>
                <br></br>
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
                    <div className='invalid-feedback'>Enter title </div>
                    <div className='valid-feedback'>Title looks good</div>
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
                    <div className='invalid-feedback'>Enter description </div>
                    <div className='valid-feedback'>Description looks good</div>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formImage" className="mt-3">
                <Form.Label column sm={2}>
                    Upload Image:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handlefilechange}
                        placeholder="upload image"
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
                    <div className='invalid-feedback'>Please enter Price  </div>
                    <div className='valid-feedback'>Price looks good</div>
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
                    <div className='invalid-feedback'>Please Enter Country Name </div>
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
                    <div className='invalid-feedback'>Please Enter Location Address </div>
                </Col>
            </Form.Group>

            <Button variant="Default" type="submit" className="mt-4" style={{backgroundColor:'#fe424d', color:'white'}}>
                Add
            </Button>
        </Form>
        </div>
        </Container>
        </>
    )
}