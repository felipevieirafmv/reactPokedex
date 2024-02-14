import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Evolutions(props)
{
    return props.evolutions.map((item, index) => {
        return(
            <Col key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Row style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {item.details ? 
                        <Col>
                            <p>teste</p>
                        </Col> : <></>
                    }
                    <Col>
                        <img src={item.url} style={{height: "200px", width: "200px"}}/>
                        <p>#{item.id} {item.name}</p>
                    </Col>
                </Row>
            </Col>
        )
    })
}