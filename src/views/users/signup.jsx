import { Container,Form,Col,Row,Button } from "react-bootstrap"
import { useState } from "react";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Signup() {
    const navigate= useNavigate();

    const [validate, setValidate]= useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        password: ''
    });
    const handlechange= async (event) => {
        const {name, value}= event.target;
        setFormData((prevData) => ({
            ...prevData, [name]:value
        }));
    }

    const handlesubmit=async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);
        try {
            console.log("formdata is", formData.username, formData.email, formData.password);
            const response = await axios.post("http://localhost:8080/user/signup",{
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            console.log(response.data);
            navigate("/");

        }
        catch(err) {
            console.error("error is ", err);
        }

    };
    return (
        <>
            <Container className='form'>
            <div className="form-container">
            <Form noValidate validated= {validate} onSubmit={handlesubmit}>
                    <h3>SignUp</h3>
                    <br />
                    
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            UserName: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="username"
                                id="username"
                                onChange={handlechange}
                                placeholder="Enter username"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Title </div>
                        </Col>
                    
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Email: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                onChange={handlechange}
                                placeholder="Enter email"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Email ID </div>
                        </Col>

                    </Form.Group>
                    <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            FirstName: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="firstname"
                                id="firstname"
                                onChange={handlechange}
                                placeholder="Enter user firstname"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Name </div>
                        </Col>

                    </Form.Group>
                    <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Middle Name: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="middlename"
                                id="middlename"
                                onChange={handlechange}
                                placeholder="Enter middle name"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Name </div>
                        </Col>

                    </Form.Group>
                    <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            LastName: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="lastname"
                                id="lastname"
                                onChange={handlechange}
                                placeholder="Enter last name"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Name </div>
                        </Col>

                    </Form.Group>
                    <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                            Password: 
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="password"
                                name="password"
                                id="password"
                                onChange={handlechange}
                                placeholder="Enter your password"
                                required
                            />
                            <div className='invalid-feedback'>Enter Valid Password </div>
                        </Col>

                    </Form.Group>
                    <Button variant="Success" type="submit" className="mt-4" style={{ backgroundColor: '#fe424d', color: 'white' }}>
                        SignUp
                    </Button>
            </Form>
            </div>
            </Container>
        </>
    )
}