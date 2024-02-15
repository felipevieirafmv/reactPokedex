import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'
import { Link, Outlet } from 'react-router-dom';
import logo from './logo.png';
import { ThemesContext } from "../../context/themes";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import lightIcon from './sun.svg';
import darkIcon from './moon.svg';
import * as jwt_decode from 'jwt-decode';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar() {

    const { dark, handleTheme } = useContext(ThemesContext);

    const token = sessionStorage.getItem('token');
    const decodeToken = jwt_decode.jwtDecode(token)
    console.log(decodeToken)

    const containerStyle = {
        '--background-color': dark ? '#333' : '#fff',
    };

    const [expanded, setExpanded] = useState(false);

    return (
        <>

            <Navbar className={styles.AllNavBar} expand="lg" expanded={expanded}>
                <Container fluid>
                    <Link to='/home' className={styles.links}>
                        <Navbar.Brand><img src={logo} className={styles.LogoImage} alt="Logo" /></Navbar.Brand>
                    </Link>
                    <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3" style={{ display: 'flex', alignItems: 'center' }}>
                            {decodeToken.adm ? <Link to='/home/adm' className={styles.links}>Adm</Link> : null}
                            <Link to='/home/get/1' className={styles.links}>Search</Link>
                            <Button variant="outline" onClick={handleTheme}>
                                {dark ? <img src={lightIcon} alt="Light Mode" /> : <img src={darkIcon} alt="Dark Mode" />}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={expanded} onHide={() => setExpanded(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3" style={{ display: 'flex', flexDirection: 'column' }}>
                        {decodeToken.adm ? <Link to='/home/adm' className={styles.links}>Adm</Link> : null}
                        <Link to='/home/get/1' className={styles.links}>Search</Link>
                        <Button variant="outline" onClick={handleTheme}>
                            {dark ? <img src={lightIcon} alt="Light Mode" /> : <img src={darkIcon} alt="Dark Mode" />}
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <Outlet />
        </>
    )
}
