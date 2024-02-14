import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserDefault from './person-circle.svg';

export default function CardsAdm() {
    return (
        <div className={StyleSheet.divAll}>
            <Card style={{ width: '18rem', display: 'flex', alignItems: 'center' }}>
                <Card.Img variant="top" src={UserDefault} style={{ height: '15rem', marginTop: '10px' }} />
                <Card.Body>
                    <Card.Title>User Name</Card.Title>
                    <Card.Text>
                        <p>
                            Data da criação:
                        </p>
                        <p>
                            Data de alguma coisa que eu n lembro
                        </p>
                    </Card.Text>
                    <Button variant="danger">Excluir</Button>
                </Card.Body>
            </Card>
        </div>
    );
}