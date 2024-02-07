import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const usePokemon = (name) => {
    const [pokemon, setPokemon] = useState({})
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState({});
    const [pkmSpc, setPkmSpc] = useState({});
    const [evlChain, setEvlChain] = useState({});
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleGet(e){
        e.preventDefault()
        setIsLoading(true)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data)
        const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        setPkmSpc(res2.data)
        setIsLoading(false)
    }

    useEffect(() => {
        handleAbilities()
    }, [pokemon])

    const handleAbilities = () => {
        setAbilities([])
        pokemon.abilities?.map(async item => {
            const res = await axios.get(item.ability.url)
            setAbilities(abilities => [...abilities, {
                name: item.ability.name[0].toUpperCase() + item.ability.name.substring(1),
                description: res.data.effect_entries[1]?.effect
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

            let learnMove = ''

            if (item.version_group_details[0].move_learn_method.name == "level-up")
                learnMove = "Level: " + item.version_group_details[0].level_learned_at
            else
                learnMove = item.version_group_details[0].move_learn_method.name[0].toUpperCase + item.version_group_details[0].move_learn_method.name.substring(1)

            setMoves(moves => [...moves, {
                name: item.move.name[0].toUpperCase() + item.move.name.substring(1),
                power: res.data.power,
                pp: res.data.pp,
                accuracy: res.data.accuracy,
                type: res.data.type.name,
                effect: res.data.effect_entries[0]?.effect,
                dmgClass: res.data.damage_class.name,
                learn: learnMove
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
            }]
        })
    }

    return { handleGet, abilities, locations, handleMoves, handleLocations, pkmSpc, handleStats, pokemon, stats, moves, isLoading }
}

export default usePokemon;