import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const usePokemon = (name) => {
    const [pokemon, setPokemon] = useState({})
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState({});
    const [pkmSpc, setPkmSpc] = useState({});
    const [evlRes, setEvlRes] = useState({});
    const [evlChain, setEvlChain] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    async function handleGet(e){
        if(e)
            e.preventDefault()
        setFirstTime(false)
        setIsLoading(true)
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemon(res.data)
            const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            setPkmSpc(res2.data)
        }
        catch(error){ }
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
                learnMove = "Lvl. " + item.version_group_details[0].level_learned_at
            else
                learnMove = item.version_group_details[0].move_learn_method.name[0].toUpperCase() + item.version_group_details[0].move_learn_method.name.substring(1)

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

    // async function 

    async function handleEvlChain()
    {
        setEvlChain([])

        let res;
        if (pkmSpc) {
            try {
                res = await axios.get(pkmSpc.evolution_chain?.url)
                setEvlRes(res.data.chain);
            } catch (error) {
                console.error('Erro ao buscar cadeia de evolução:', error);
            };
        }

        let evoData = []

        let res1;
        if(res)
            res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.species?.name}`)

        evoData.push({
            name: res1?.data.name,
            id: res1?.data.id,
            url: res1?.data.sprites?.front_default
        })

        if(res.data.chain.evolves_to?.length > 0)
        {
            const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.evolves_to[0].species?.name}`)

            let evlDtl1 = []

            evlDtl1.push({trigger: res.data.chain.evolves_to[0].evolution_details[0].trigger.name})
            Object.keys(res.data.chain.evolves_to[0].evolution_details[0]).map(item => {
                if((res.data.chain.evolves_to[0].evolution_details[0][item] !== null) && 
                    item !== 'trigger' &&
                    (res.data.chain.evolves_to[0].evolution_details[0][item] !== '') &&
                    (res.data.chain.evolves_to[0].evolution_details[0][item])
                )
                {
                    if(res.data.chain.evolves_to[0].evolution_details[0][item] === true)
                        evlDtl1.push({[item]: [item]})
                    else if(typeof res.data.chain.evolves_to[0].evolution_details[0][item] === 'object')
                    {
                        // console.log(item)
                        // evlDtl1.push({[item]: [item]})
                        evlDtl1.push({[item]: res.data.chain.evolves_to[0].evolution_details[0][item].name})
                    }
                    else
                        evlDtl1.push({[item]: res.data.chain.evolves_to[0].evolution_details[0][item]})
                }
            })

            evoData.push({
                details: evlDtl1
            })

            evoData.push({
                name: res.data.chain.evolves_to[0].species?.name,
                id: res2.data.id,
                url: res2.data.sprites?.front_default
            })

            if(res.data.chain.evolves_to[0].evolves_to?.length > 0)
            {
                const res3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.evolves_to[0].evolves_to[0].species?.name}`)

                let evlDtl2 = []

                evlDtl2.push({trigger: res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name})
                Object.keys(res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0]).map(item => {
                    if((res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item] !== null) && 
                        item !== 'trigger' &&
                        (res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item] !== '') &&
                        (res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item])
                    )
                        if(typeof res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item] === 'object')
                        {
                            // evlDtl2.push({[item]: [item]})
                            evlDtl2.push({[item]: res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item].name})
                        }
                        else
                            evlDtl2.push({[item]: res.data.chain.evolves_to[0].evolves_to[0].evolution_details[0][item]})
                })

                evoData.push({
                    details: evlDtl2
                })

                evoData.push({
                    name: res.data.chain.evolves_to[0].evolves_to[0].species?.name,
                    id: res3.data.id,
                    url: res3.data.sprites?.front_default
                })
            }
        }

        setEvlChain(evoData)
    }

    return { handleGet, abilities, locations, handleMoves, handleLocations, pkmSpc, handleStats, pokemon, stats, moves, isLoading, handleEvlChain, evlChain, firstTime }
}

export default usePokemon;