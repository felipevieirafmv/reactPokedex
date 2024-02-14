import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'
import { Link, Outlet } from 'react-router-dom';
import logo from './logo.png';
import { ThemesContext } from "../../context/themes";
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import lightIcon from './sun.svg';
import darkIcon from './moon.svg';
import * as jwt_decode from 'jwt-decode';

export default function NavBar() {

    const { dark, handleTheme } = useContext(ThemesContext);

    const token = sessionStorage.getItem('token');
    const decodeToken = jwt_decode.jwtDecode(token)
    console.log(decodeToken)

    const containerStyle = {
      '--background-color': dark ? '#333' : '#fff',
    };

    return (
        <>
            <Navbar expand="lg" className={styles.AllNavBar}>
                <Container style={{ padding: '0', margin: '0' }}>
                    <div>

                        <Link to='/home' className={styles.links}>
                            <Navbar.Brand><img src={logo} className={styles.LogoImage} /></Navbar.Brand>
                        </Link>
                    </div>
                    <div className={styles.PagesNav}>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className={styles.teste}>

                                {decodeToken.adm ? <Link to='/home/adm' className={styles.links}>Adm</Link> : <></>}
                                <Link to='/home/get/1' className={styles.links}>Search</Link>
                                <Button variant="outline" onClick={handleTheme}>
                                    {dark ? <img src={lightIcon} alt="Light Mode" /> : <img src={darkIcon} alt="Dark Mode" />}
                                </Button>


                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
