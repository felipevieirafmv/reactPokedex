import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from "../../context/alert";
import { useContext, useState } from "react";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {SECRET} from "../../env";

export default function CardLogin() {
    
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    const navigate = useNavigate();

    var [login, setLogin] = useState('');
    var [password, setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        if(!formValid()) return

        const json = {
            login, password
        }
        try {
            const jsonCrypt = CryptoJS.AES.encrypt(JSON.stringify(json), SECRET).toString();
            var res = await axios.post('http://localhost:8080/api/user/',{
                jsonCrypt
            })
            sessionStorage.setItem('token', res.data.token);
            navigate('/home')
        } catch (error) {
            setMessage('Erro ao se conectar');
            setShow(true);
            setVariant('danger');
        }
    }

    function formValid(){
        if(!login.includes('@')){
            setMessage('Insira um e-mail válidos')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(login.length < 5){
            setMessage('Insira um e-mail válido')
            setShow(true);
            setVariant('danger')
            return false;
        }

        return true
    }

    return (
        
            <Card className={styles.cardLoginStyles}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Card.Title style={{ margin: '20px', marginBottom: '40px' }}><h1>Login</h1></Card.Title>
                        <Card.Text>
                   
                                <Form.Group className={styles.FormLogin} controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" 
                                    onChange={(e) => setLogin(e.target.value)}
                                    value={login}/>
                                    
                                </Form.Group>

                                <Form.Group className={styles.FormLogin} controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}/>
                                    
                                </Form.Group>
                            


                        </Card.Text>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="danger" className={styles.ButtonEntrar} type='submit'>
                                    Entrar
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
      

    )
}