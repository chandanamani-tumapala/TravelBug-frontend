import { Container,Form,Col,Row,Button, Alert } from "react-bootstrap"
import { useState } from "react";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function SignIn() {
    const navigate= useNavigate();
    const [errorMessage, setErrorMessage]= useState('');
    const [validate, setValidate]= useState(false);
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post("http://localhost:8080/user/signin",{
                username: formData.username,
                password: formData.password
            })
            const {token, user} = response.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log("login successful", user);
            console.log(response.data);
            navigate("/index");
            window.location.reload();
        }
        catch(err) {
            if(err.response && err.response.status===401) {
                setErrorMessage("Invalid user credentials");
            }
            else{
            console.error("error is ", err);
            }
        }
    };

    return (
        <>
            <Container className='form'>
            <div className="form-container">
            <Form noValidate validated= {validate} onSubmit={handlesubmit}>
                    <h3>LogIn</h3>
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
                        LogIn
                    </Button>
            </Form>

            {errorMessage && (
                <Alert 
                    variant = "danger"
                    onClose={()=> setErrorMessage("")}
                    dismissible>
                        <p>{errorMessage}</p>
                </Alert>
                
            )}
            </div>
            </Container>
        </>
    )
}