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
                                    <Button variant="danger">Excluir</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    );
}


