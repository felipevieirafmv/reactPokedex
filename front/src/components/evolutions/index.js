import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Evolutions(props)
{
    // console.log(props.evolutions)
    return props.evolutions.map((item, index) => {
        if(Object.keys(item) == "details")
        {
            return (
                <Col xs={12} sm={8} md={1} key={index}>
                    {
                        item.details.map((item2, index2) => {
                            let thisKey = Object.keys(item2)[0]
                            return <p key={index2}>{item2[thisKey]}</p>;
                        })
                    }
                </Col>
              );
        }
        return(
            <Col key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}} xs={12} sm={8} md={3}>
                <img src={item.url} style={{height: "200px", width: "200px", imageRendering:'pixelated'}}/>
                <p>#{item.id} {item.name}</p>
            </Col>
        )
    })
}