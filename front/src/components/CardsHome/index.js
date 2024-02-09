import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import styles from './styles.module.scss';
import Default from './defaultPokemon.png';
import { Link } from 'react-router-dom';

function CardsHome() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(21);
  const [defaultPokemon] = useState(Default);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0`);
      if (!response.data.results) {
        throw new Error('Erro ao carregar JSON da API');
      }
      const pokemonList = response.data.results;
      const pokemonData = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          console.log(res)
          return {
            name: res.data.name,
            imageUrl: res.data.sprites.front_default == null ? defaultPokemon : res.data.sprites.front_default,
            id: res.data.id,
            elementType: res.data.types[0].type.name
          };
        })
      );

      setData(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const pageNumbers = Math.ceil(data.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = [];
  for (let i = 1; i <= pageNumbers; i++) {
    renderPageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }


  const renderPaginationItems = () => {
    if (window.innerWidth < 576) {
      return (
        <>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {renderPageNumbers[currentPage - 1]}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers} />
        </>
      );
    } else {
      return (
        <>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {window.innerWidth < 768 ? renderPageNumbers.slice(0, 3) : renderPageNumbers.slice(0, 5)}
          {window.innerWidth < 768 ? (currentPage >= 4 && <Pagination.Ellipsis />) : (currentPage >= 6 && <Pagination.Ellipsis />)}
          {window.innerWidth < 768 ? renderPageNumbers.slice(-1) : renderPageNumbers.slice(-2)}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers} />
        </>
      );
    }
  };

  const getElementTypeClass = (elementType) => {
    switch (elementType) {
      case 'fire':
        return styles.fire;
      case 'water':
        return styles.water;
      case 'grass':
        return styles.grass;
      case 'bug':
        return styles.bug;
      case 'dark':
        return styles.dark;
      case 'dragon':
        return styles.dragon;
      case 'electric':
        return styles.electric;
      case 'fairy':
        return styles.fairy;
      case 'fighting':
        return styles.fighting;
      case 'ghost':
        return styles.ghost;
      case 'flying':
        return styles.flying;
      case 'ground':
        return styles.ground;
      case 'ice':
        return styles.ice;
        case 'normal':
        return styles.normal;
        case 'poison':
        return styles.poison;
        case 'psychic':
        return styles.psychic;
        case 'rock':
        return styles.rock;
        case 'steel':
        return styles.steel;
      default:
        return '';
    };
  }

  return (
    <>
      <Container className={styles.ContainerCards}>
        <Row className={styles.RowCard}>
          {data.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((pokemon, index) => (
            <Col key={index}>
              <Link to={`home/get/${pokemon.name}`} className={styles.LinkCard}>
                <Card className={`${styles.Card} ${getElementTypeClass(pokemon.elementType)}`}>
                  <Card.Img variant="top" src={pokemon.imageUrl} />
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                      #{pokemon.id}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Pagination>
          {renderPaginationItems()}
        </Pagination>
      </Container>
    </>
  );
}

export default CardsHome;
