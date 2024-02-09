import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.scss'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
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
import usePokemon from '../../hooks/pokemon';
import ModalAbilities from '../../components/modalAbilities';
import ModalLocations from '../../components/modalLocations';
import MovesList from '../../components/movesList';
import Evolutions from '../../components/evolutions';
import Spinner from 'react-bootstrap/Spinner';
  
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function PokemonPage()
{
    const {pkmName} = useParams();
    const [name, setName] = useState(pkmName)
    const [abilitiesModal, setAbilitiesModal] = useState(false);
    const { handleGet, abilities, handleMoves, handleLocations, pkmSpc, handleStats, pokemon, stats, locations, moves, isLoading, handleEvlChain, evlChain, firstTime } = usePokemon(name);
    const [locationsModal, setLocationsModal] = useState(false);
    const [movesModal, setMovesModal] = useState(false);
    const radarOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 200,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    const data = {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [{
            label: 'Stats',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }]
    }

    function handleAbilitiesModal()
    {
        if(name === '') return
        setAbilitiesModal(true);
        setLocationsModal(false);
        setMovesModal(false);
        handleLocations()
    }
    function handleLocationsModal()
    {
        if(name === '') return
        setAbilitiesModal(false);
        setLocationsModal(true);
        setMovesModal(false);
        handleLocations()
    }

    const RenderTypes = () => {
        return pokemon.types?.map((item, index) => {
            return(
                <img src={require(`../../img/${item.type.name}.png`)} key={index}/>
            )
        })
    }

    useEffect(() => {
        if(!firstTime)
        {
            handleStats();
            handleMoves();
        }
    }, [pokemon])

    useEffect(() => {
        if(!firstTime)
            handleEvlChain();
    }, [pkmSpc])

    useEffect(() => {
        handleGet();
    }, [pkmName])

    const RenderLoading = () => {
        if(isLoading)
            return(
                <div style={{ textAlign: 'center', width: "100%", height: "100%", paddingTop: '10px' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                </div>
            )
        return(
            <>
                <img src={pokemon.sprites?.front_default} className={ styles.imgSize }/>
                    <p>#{pokemon.id} {pokemon.name}</p>
                    <div className={ styles.defaultCenter }>
                        <RenderTypes />
                    </div>
                    <div className={ styles.buttonContainer }>
                        <Button onClick={() => handleAbilitiesModal()}>
                            Abilities
                        </Button>
                            <ModalAbilities abilities={abilities} show={abilitiesModal} hideModal={setAbilitiesModal} />
                        <Button onClick={() => handleLocationsModal()}>
                            Locations
                        </Button>
                            <ModalLocations locations={locations} show={locationsModal} hideModal={setLocationsModal} />
                </div>
            </>
        )
    }

    return(
        <>
            <Row className={ styles.container }>
                <Col className={styles.radarContainer} xs={12} sm={8} md={4}>
                    {pokemon.name ? <Radar data={stats} options={radarOptions} style={{width: "30vw"}}/> : <Radar data={data} options={radarOptions} style={{width: "30vw"}}/>}
                </Col>
                <Col className={ styles.container } xs={12} sm={8} md={4}>
                    <div>
                        <Form onSubmit={handleGet}>
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
                        <RenderLoading />
                    </div>
                </Col>
                <Col className={ styles.container } xs={12} sm={8} md={4}>
                    <MovesList moves={moves} />
                </Col>
            </Row>
            <Row className={ styles.container }>
                <Evolutions evolutions={evlChain} />
            </Row>
        </>
    )
}
