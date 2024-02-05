import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './styles.module.scss'
import { Link } from 'react-router-dom';

export default function NavBar()
{
    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className={styles.teste}
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                        <Link to='/post' className={styles.links}>Post</Link>
                        <Link to='/pokemon' className={styles.links}>Pokemon</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    )
}
