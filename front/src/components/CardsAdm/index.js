import Button from 'react-bootstrap/Button';
import UserDefault from './person-circle.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss'
import { Row, Col, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import SearchIcon from './search.svg';
import InputGroup from 'react-bootstrap/InputGroup';

export default function CardsAdm() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');



    useEffect(() => {
        GetAllUsers();
    }, []);

    async function handleDelete(userId) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/user/remove/${userId}`);
            if (response.status === 200) {
                console.log('User deleted successfully');
            } else {
                console.log('Failed to delete user');
            }
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    }

    const GetAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/getAll`);

            if (!response.data) {
                throw new Error('Erro ao carregar Users da API');
            }

            const UsersList = response.data.users;

            setUsers(UsersList)


        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div className={styles.divAll}>

            <Row className="justify-content-center mb-4" style={{ maxWidth: '99vw' }}>
                <div className="mb-4" />
                <InputGroup className="mb-3" style={{ maxWidth: '20vw', display: 'flex' }}>
                    <InputGroup.Text id="basic-addon1"><img src={SearchIcon} /></InputGroup.Text>
                    <Form.Control
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <div className="mb-4" />

                {users
                    .filter(user => filter === '' || user.email.includes(filter))
                    .map((user) => (
                        <Col xs='auto' sm='auto' md='auto'>
                            <Card className={styles.CardsUsers}>
                                <Card.Img variant="top" src={UserDefault} style={{ height: '15rem', marginTop: '10px' }} />
                                <Card.Body>
                                    <Card.Title>{user.email}</Card.Title>
                                    <Card.Text>
                                        <p>
                                            Cadastro:
                                        </p>
                                        <p>
                                            {user.createdAt}
                                        </p>

                                    </Card.Text>
                                    <Button variant="danger" onClick={() => handleDelete(user._id)}>Excluir</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    );
}


