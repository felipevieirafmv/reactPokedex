import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'
import { Link, Outlet } from 'react-router-dom';
import logo from './logo.png';
import divLogo from './DivPokebola.png'

export default function NavBar() {
    return (
        <>
            <Navbar expand="lg" className={styles.AllNavBar}>
                <Container style={{ padding: '0', margin:'0' }}>
                    <Link to='/home' className={styles.links}>
                        <Navbar.Brand><img src={logo} className={styles.LogoImage} /></Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={styles.teste}>

                            <Link to='/home/post' className={styles.links}>Post</Link>
                            <Link to='/home/get' className={styles.links}>Get</Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
