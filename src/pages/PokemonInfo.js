import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/pokemonInfo.css"
import {ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import PokeData from '../PokeData'
import { useContext } from 'react'
function PokemonInfo() {
    const {pokemonData,setPokemonData} = useContext(PokeData)
    const {name} = useParams()
    const style={display:"none"}
    let list = pokemonData?.filter(element=>element.name===name)
    const [ince,setIncrease]=useState([])
    const disp = {display:"block"}
    const [decr,setDecrease]=useState([])
    useEffect(() => {
      const isFound = pokemonData.find(element=>{
        if(element.name===name){
          return true;
        }
        return false;
      })
      if(!isFound){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
         .then(res=>{
          setPokemonData([...pokemonData,
            {id:res.data.id, abilities: res.data.abilities, name: name, hp: res.data.stats[0].base_stat, attack: res.data.stats[1].base_stat, defense: res.data.stats[2].base_stat, specialAttack: res.data.stats[3].base_stat, specialDefense: res.data.stats[4].base_stat, speed:res.data.stats[5].base_stat, weight : res.data.weight,height: res.data.height}
          ])
          axios.get(`https://pokeapi.co/api/v2/pokemon/${(res.data.id)+1}`)
       .then((response) => {
        setIncrease(response.data.name)
        }).catch(err => console.log(err));
        axios.get(`https://pokeapi.co/api/v2/pokemon/${(res.data.id)-1}`)
       .then((resp) => setDecrease(resp.data.name))
       .catch(err => console.log(err));
        })
        .catch(err=>{console.log(err)})
      }
    }, [name])
  return (
    <div>
        <h2 className='pkm-til'>
        <Link style={list[0]?.id===1?style:disp} to={`/pokemon/${decr}`}><ArrowLeftOutlined  className='left abs'/></Link>
        {name}
        <Link to={`/pokemon/${ince}`}><ArrowRightOutlined className='right abs' /></Link>
        </h2>
    <div className='pokemon-conainer'>
        <div className='img'><img width="500px" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}/></div>
        <div className="PokemonInfo">
        <details>
                <summary>abilities:</summary>
                <ul>
                
                </ul>
            </details>
            
            <p>id: {list[0]?.id}</p>
            <p>hp: {list[0]?.hp}</p>
            <p>attack: {list[0]?.attack}</p>
            <p>defense: {list[0]?.defense}</p>
            <p>special-attack: {list[0]?.specialAttack}</p>
            <p>special-defense: {list[0]?.specialDefense}</p>
            <p>speed: {list[0]?.speed}</p>
            <p>weight: {list[0]?.weight}</p>
            <p>height: {list[0]?.height}</p>
        </div>
    </div>
    </div>
  )
}

export default PokemonInfo