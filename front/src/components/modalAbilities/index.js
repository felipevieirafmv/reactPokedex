import Modal from 'react-bootstrap/Modal';

export default function ModalAbilities(props)
{
    const RenderAbilities = () => {
        return props.abilities.map((item, index) => {
            return(
                <p key={index}>{item.name}: {item.description}</p>
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
                    Abilities
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RenderAbilities />
            </Modal.Body>
        </Modal>
    )
}