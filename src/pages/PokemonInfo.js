import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/pokemonInfo.css"
import {ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';

function PokemonInfo() {
    const {name} = useParams()
    const [poke,setPoke] =useState()
    const ablt = poke?.abilities;
    const [ince,setIncrease]=useState([])
    const [decr,setDecrease]=useState([])
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res=>{setPoke(res.data)}).catch(err=>{console.log(err)})
      }, [name])

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${(poke?.id)+1}`)
         .then((response) => setIncrease(response.data.name))
         .catch(err => console.log(err));
    }, [poke?.id]);
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${(poke?.id)-1}`)
         .then((resp) => setDecrease(resp.data.name))
         .catch(err => console.log(err));
    }, [poke?.id]);
    
   const style={
      display:"none",
   }
   const disp={
      display:"block",
   }
      
 
      
  return (
    <div>
        <h2 className='pkm-til'>
        
          <Link style={poke?.id===1?style:disp} to={`/pokemon/${decr}`}><ArrowLeftOutlined  className='left abs'/></Link>
        {name}
        <Link to={`/pokemon/${ince}`}><ArrowRightOutlined className='right abs' /></Link>
        </h2>
        
        
    <div className='pokemon-conainer'>
        <div className='img'><img width="500px" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}/></div>
        
        <div className="PokemonInfo">
            <details>
                <summary>abilities:</summary>
                <ul>
                {ablt?.map(item=>{
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