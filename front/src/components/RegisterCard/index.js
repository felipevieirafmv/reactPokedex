import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AlertContext } from "../../context/alert/index";
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SECRET } from "../../env";
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default function CardRegister() {
    

    const navigate = useNavigate();
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    
    async function handleSubmit(e) { 

        e.preventDefault();

        if (!formValid()) 
            return

        const json = {
            name, email, password, confirmPassword
        }

        const jsonCrypt = CryptoJS.AES.encrypt(JSON.stringify(json), SECRET).toString();
        try {
            var res = await axios.post('http://localhost:8080/api/user/register', {
                jsonCrypt
            })

            console.log(res)

            setMessage(res.data.message);
            setVariant('success')
            setShow(true);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            navigate('../');

        } catch (error) {
            console.log(error);
        }
    }

    function formValid(){
        if(!name.includes(' ')){
            setMessage('Insira nome e sobrenome')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(name.length<5){
            setMessage('Insira um nome e sobrenome válidos')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(!email.includes('@')){
            setMessage('Insira um e-mail válidos')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(email.length < 5){
            setMessage('Insira um e-mail válido')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(confirmPassword !== password) {
            setMessage('As senhas não conferem')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(password.length < 6) {
            setMessage('Senha inferior a 6 caracteres')
            setShow(true);
            setVariant('danger')
            return false
        };

        return true
    }

    return (
        <div className={styles.appContainer}>
            <Card className={styles.cardLoginStyles}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Card.Title style={{ margin: '20px', marginBottom: '40px' }}><h1>Cadastrar</h1></Card.Title>
                        <Card.Text>
                            <div className={styles.FormLogin}>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                  
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                                    <Form.Label>Confirme a senha</Form.Label>
                                    <Form.Control type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                  
                                    
                                </Form.Group>

                            </div>


                        </Card.Text>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="danger" type='submit'>
                                Cadastrar
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