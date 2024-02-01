import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function CardRegister() {
    return (
        <div className={styles.appContainer}>
            <Card className={styles.cardLoginStyles}>
                <Card.Body>
                    <Form>
                        <Card.Title style={{ margin: '20px', marginBottom: '40px' }}><h1>Cadastrar</h1></Card.Title>
                        <Card.Text>
                            <div className={styles.FormLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Confirme o email</Form.Label>
                                    <Form.Control type="email" />
                                    <Form.Text className="text-muted">
                                        *Os emails não são iguais
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirme a senha</Form.Label>
                                    <Form.Control type="password" />
                                    <Form.Text className="text-muted">
                                        *As senhas não são iguais
                                    </Form.Text>
                                </Form.Group>
                            </div>


                        </Card.Text>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="danger">
                                <Link className={styles.ButtonCadastro} to="../">
                                    Cadastrar
                                </Link>
                            </Button>
                            <Button variant="">
                                <Link className={styles.ButtonCancelar} to="../">
                                    Cancelar
                                </Link>
                                </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}