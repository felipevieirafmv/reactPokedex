import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function PostPage()
{
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [gravadora, setGravadora] = useState('')
    const [ano, setAno] = useState(0)

    const handlePost = useCallback(async (e) => {
        e.preventDefault()
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            titulo: titulo,
            autor: autor,
            gravadora: gravadora,
            ano: ano,
        });
        console.log(res);
    }, [titulo, autor, gravadora, ano])

    return (
        <Form className={ styles.container } onSubmit={handlePost}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}    
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                    type="text"
                    placeholder="Autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}    
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                    type="text"
                    placeholder="Gravadora"
                    value={gravadora}
                    onChange={(e) => setGravadora(e.target.value)}    
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                    type="number"
                    placeholder="Ano"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}    
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    );
}
