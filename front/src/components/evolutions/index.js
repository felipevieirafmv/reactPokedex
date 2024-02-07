import Col from 'react-bootstrap/Col';

export default function Evolutions(props)
{
    return props.evolutions.map((item, index) => {
        return(
            <Col key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={item.url} style={{height: "200px", width: "200px"}}/>
                <p>#{item.id} {item.name}</p>
            </Col>
        )
    })
}