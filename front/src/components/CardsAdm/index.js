import Button from 'react-bootstrap/Button';
import UserDefault from './person-circle.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss'
import { Row, Col, Card } from 'react-bootstrap';

export default function CardsAdm() {
    const [users, setUsers] = useState([]);

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

    console.log(users)


    return (
        <div className={styles.divAll}>
            <Row>

                {users
                    .map((user) => (
                        <Col>
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


