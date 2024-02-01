import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
  
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function GetPage(){

    const [pokemon, setPokemon] = useState({})
    const [name, setName] = useState('')
    const [abilitiesModal, setAbilitiesModal] = useState(false);
    const [abilities, setAbilities] = useState([]);
    const [locationsModal, setLocationsModal] = useState(false);
    const [locations, setLocations] = useState([]);
    const [movesModal, setMovesModal] = useState(false);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState({});

    function handleAbilitiesModal()
    {
        if(name === '') return
        setAbilitiesModal(true);
        setLocationsModal(false);
        setMovesModal(false);
        handleAbilities();
    }
    function handleLocationsModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(true);
        setMovesModal(false);
        handleLocations()
    }
    function handleMovesModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(false);
        setMovesModal(true);
        handleMoves();
    }

    async function handleGet(e){
        e.preventDefault()
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data)
        handleStats();
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
                effect: res.data.effect_entries[0]?.effect
            }])
        })
    }

    async function handleStats()
    {
        let lblValue = []
        let dataValue = []
        pokemon.stats?.map(item => {
            lblValue.push(item.stat.name)
            dataValue.push(item.base_stat)
        })
        setStats({
            labels: lblValue,
            datasets: [{
                label: 'Stats',
                data: dataValue,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }],
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: 300,
                        beginAtZero: true,
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            stepSize: 33.333
                        }
                    }
                }
            }
        })

        console.log(stats.labels)
    }
    const data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
          {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

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
                    <h1 key={index}>{item.name}</h1>
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
                
                {pokemon.name?<Radar data={stats} />:<></>}
            </div>
        </>
    )
}