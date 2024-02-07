import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function MovesList(props)
{
    const RenderMoves = () => {
        return props.moves.map((item, index) => {
            return(
                
                <ListGroup.Item key={index} style={{textAlign: 'center'}}>
                    <h1>{item.name}</h1>
                    <p>Dano: {item.power}</p>
                    <p>PP: {item.pp}</p>
                    <p>Accuracy: {item.accuracy}</p>
                    <p>Learn: {item.learn}</p>
                    <img src={require(`../../img/${item.type}.png`)} height={'30vh'}/>
                    <img src={require(`../../img/${item.dmgClass}.png`)} height={'30vh'}/>
                    <p>Effect: {item.effect}</p>
                </ListGroup.Item>
            )
        })
    }

    return(        
        <Card style={{ width: '25vw', height: '50vh' }}>
            <Card.Header>Moves</Card.Header>
            <ListGroup variant="flush" style={{ overflow: 'auto' }}>
                <RenderMoves />
            </ListGroup>
        </Card>
    )
}