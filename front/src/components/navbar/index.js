import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'
import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className={styles.teste}
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to='/home/post' className={styles.links}>Post</Link>
                            <Link to='/home' className={styles.links}>Get</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}
