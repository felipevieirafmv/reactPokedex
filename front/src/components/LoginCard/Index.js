import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function CardLogin() {
    return (
        <div className={styles.appContainer}>
            <Card className={styles.cardLoginStyles}>
                <Card.Body>
                    <Form>
                        <Card.Title style={{ margin: '20px', marginBottom: '40px' }}><h1>Login</h1></Card.Title>
                        <Card.Text>
                   
                                <Form.Group className={styles.FormLogin} controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" />
                                    <Form.Text className="text-muted">
                                        *Email incorreto
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className={styles.FormLogin} controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" />
                                    <Form.Text className="text-muted">
                                        *Senha incorreta
                                    </Form.Text>
                                </Form.Group>
                            


                        </Card.Text>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="danger">
                                <Link className={styles.ButtonEntrar} to="/get">
                                    Entrar
                                </Link>
                            </Button>
                            <Button variant="">
                                <Link className={styles.ButtonCadastro} to="/register">
                                    Cadastro
                                </Link>
                                </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}