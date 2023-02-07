import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/pokemonInfo.css"
import {ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';
import PokeData from '../PokeData'
import { useContext } from 'react'
function PokemonInfo() {
  const {pokemonData,setPokemonData} = useContext(PokeData)
    const {name} = useParams()
    const [poke,setPoke] =useState()

    
    const style={
      display:"none",
    }
    const disp={
      display:"block",
    }
  
    
    useEffect(() => {
      pokemonData.some(element => {
        if (element.name === name) {
         console.log(element.name);
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res=>{

          setPoke(res.data)


          setPokemonData([...pokemonData,
            {id:res.data.id, abilities: res.data.abilities, name: name, hp: res.data.stats[0].base_stat, attack: res.data.stats[1].base_stat, defense: res.data.stats[2].base_stat, specialAttack: res.data.stats[3].base_stat, specialDefense: res.data.stats[4].base_stat, speed:res.data.stats[5].base_stat}
          ])
        }).catch(err=>{console.log(err)})
      });
      
      
      }, [name])
      
      console.log(pokemonData)
      
    
        
    
    
    
      
  return (
    <div>
        <h2 className='pkm-til'>
        
          <Link style={poke?.id===1?style:disp} to={`/pokemon/`}><ArrowLeftOutlined  className='left abs'/></Link>
        {name}
        <Link to={`/pokemon/bulbasaur`}><ArrowRightOutlined className='right abs' /></Link>
        </h2>
        
        
    <div className='pokemon-conainer'>
        <div className='img'><img width="500px" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}/></div>
        
        <div className="PokemonInfo">
            <details>
                <summary>abilities:</summary>
                <ul>
                {(poke?.abilities)?.map(item=>{

                return <li>{item?.ability.name}</li>
            })}
                </ul>
            </details>
            
            
            <p>hp: {poke?.stats[0].base_stat}</p>
            <p>attack: {poke?.stats[1].base_stat}</p>
            <p>defense: {poke?.stats[2].base_stat}</p>
            <p>special-attack: {poke?.stats[3].base_stat}</p>
            <p>special-defense: {poke?.stats[4].base_stat}</p>
            <p>speed: {poke?.stats[5].base_stat}</p>
            <p>weight: {poke?.weight}</p>
            <p>height: {poke?.height}</p>
        </div>
    </div>
    </div>
  )
}

export default PokemonInfo