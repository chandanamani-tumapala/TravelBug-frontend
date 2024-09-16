import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdOutlineTravelExplore } from "react-icons/md";

export default function Header() {
    const token = localStorage.getItem('jwtToken');
    const handleLogout= () => {
        localStorage.removeItem('jwtToken');
        window.location.href='/';
    };
    return (
        <Navbar expand="md" className='bg-body-tertiary p-3 border-bottom' >
            <Container fluid >
                <Navbar.Brand className='d-flex align-items-center ' style = {{color:"#fe424d",fontSize:'2rem'}}>
                <MdOutlineTravelExplore style={{marginRight:'5px'}}/>
                TravelBug</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" style={{color:"#000000",fontSize:'1.25rem'}}>
                    <Nav.Link href="/index">Home</Nav.Link>
                    <Nav.Link href="/mylisting">My Listing</Nav.Link>
                    <Nav.Link href="/listings/new">Add new Listing </Nav.Link>
                </Nav>
                <Nav className="ms-auto" style={{color:"#000000",fontSize:'1.25rem'}}>
                    {!token ? (<>
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="/signup">SignUp</Nav.Link>
                        </>):(
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        )}
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}