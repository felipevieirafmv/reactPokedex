import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';

export default function GetPage(){

    const [pokemon, setPokemon] = useState({})
    const [name, setName] = useState('')
    const [abilitiesModal, setAbilitiesModal] = useState(false);
    const [abilities, setAbilities] = useState([]);
    const [locationsModal, setLocationsModal] = useState(false);
    const [locations, setLocations] = useState([]);
    const [movesModal, setMovesModal] = useState(false);
    const [moves, setMoves] = useState([]);
    const [statsModal, setStatsModal] = useState(false);
    const [stats, setStats] = useState([]);

    function handleAbilitiesModal()
    {
        if(name === '') return
        setAbilitiesModal(true);
        setLocationsModal(false);
        setMovesModal(false);
        setStatsModal(false);
        handleAbilities();
    }
    function handleLocationsModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(true);
        setMovesModal(false);
        setStatsModal(false);
        handleLocations()
    }
    function handleMovesModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(false);
        setMovesModal(true);
        setStatsModal(false);
        handleMoves();
    }
    function handleStatsModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(false);
        setMovesModal(false);
        setStatsModal(true);
    }

    async function handleGet(e){
        e.preventDefault()
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data)
    }

    async function handleAbilities()
    {
        setAbilities([])
        pokemon.abilities?.map(async item => {
            const res = await axios.get(item.ability.url)
            setAbilities(abilities => [...abilities, {
                name: item.ability.name[0].toUpperCase() + item.ability.name.substring(1),
                description: res.data.effect_entries[1].effect
            }])
        })
    }

    async function handleLocations()
    {
        setLocations([])
        const res = await axios.get(pokemon.location_area_encounters)
        res.data.map(item => {
            setLocations(locations => [...locations, {
                name: item.location_area.name[0].toUpperCase() + item.location_area.name.substring(1),
            }])
        })
    }

    async function handleMoves()
    {
        setMoves([])
        pokemon.moves?.map(async item => {
            const res = await axios.get(item.move.url)
            setMoves(moves => [...moves, {
                name: item.move.name,
                power: res.data.power,
                pp: res.data.pp,
                accuracy: res.data.accuracy,
                type: res.data.type.name,
                // effect: res.data.effect_entries[0].effect
            }])
        })
    }

    const RenderTypes = () => {
        return pokemon.types?.map((item, index) => {
            return(
                <p key={index}>{item.type.name}&nbsp;</p>
            )
        })
    }

    const RenderAbilities = () => {
        return abilities.map((item, index) => {
            return(
                <p key={index}>{item.name}: {item.description}</p>
            )
        })
    }

    const RenderLocations = () => {
        return locations.map((item, index) => {
            return(
                <p key={index}>{item.name}</p>
            )
        })
    }

    const RenderMoves = () => {
        return moves.map((item, index) => {
            return(
                <>
                    <h1>{item.name}</h1>
                    <p>Dano: {item.power}</p>
                    <p>PP: {item.pp}</p>
                    <p>Accuracy: {item.accuracy}</p>
                    <p>Type: {item.type}</p>
                    <p>Effect: {item.effect}</p>
                </>
            )
        })
    }

    return(
        <>
            <Form className={ styles.container } onSubmit={handleGet}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                        type="text"
                        placeholder="Pokémon"
                        value={name}
                        onChange={(e) => setName(e.target.value)}    
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
            <div className={ styles.container2 }>
                <img src={pokemon.sprites?.front_default} className={ styles.imgSize }/>
                <p>#{pokemon.id} {pokemon.name}</p>
                <div className={ styles.defaultCenter }>
                    <RenderTypes />
                </div>
                <Button className="me-2 mb-2" onClick={() => handleAbilitiesModal()}>
                    Abilities
                </Button>
                    <Modal
                        size="sm"
                        show={abilitiesModal}
                        onHide={() => setAbilitiesModal(false)}
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
                <Button className="me-2 mb-2" onClick={() => handleLocationsModal()}>
                    Locations
                </Button>
                    <Modal
                        size="sm"
                        show={locationsModal}
                        onHide={() => setLocationsModal(false)}
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
                <Button className="me-2 mb-2" onClick={() => handleMovesModal()}>
                    Moves
                </Button>
                    <Modal
                        size="sm"
                        show={movesModal}
                        onHide={() => setMovesModal(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Moves
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RenderMoves />
                        </Modal.Body>
                    </Modal>
                <Button className="me-2 mb-2" onClick={() => handleStatsModal()}>
                    Stats
                </Button>
            </div>
        </>
    )
}