import Modal from 'react-bootstrap/Modal';

export default function ModalLocations(props)
{
    const RenderLocations = () => {
        return props.locations.map((item, index) => {
            return(
                <p key={index}>{item.name}</p>
            )
        })
    }
    return(
        <Modal
            size="md"
            show={props.show}
            onHide={() => props.hideModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Locations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RenderLocations />
            </Modal.Body>
        </Modal>
    )
}