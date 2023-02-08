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
    const style={display:"none"}
    const disp = {display:"block"}
    const [pokemonInfo,setPokemonInfo]=useState([{name:"pokemon",hp: 30}])
    const [ince,setIncrease]=useState([])
    const [decr,setDecrease]=useState([])
    useEffect(() => {
      const isFound = pokemonData.some(element=>{
        if(element.name===name){
          setPokemonInfo([{id:element.id, name: name,hp: element.hp,attack: element.attack,defense:element.defense,specialAttack:element.specialAttack,specialDefense:element.specialDefense,speed: element.speed,height:element.height,weight:element.weight}])
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
          setPokemonInfo([{id: res.data.id, name:res.data.name,hp: res.data.stats[0].base_stat, attack: res.data.stats[1].base_stat, defense: res.data.stats[2].base_stat, specialAttack: res.data.stats[3].base_stat, specialDefense: res.data.stats[4].base_stat, speed:res.data.stats[5].base_stat, height: res.data.height, weight: res.data.weight}])
        })
          
          .catch(err=>{console.log(err)})
      }
    }, [name])
    useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${(pokemonInfo[0].id)+1}`)
       .then((response) => setIncrease(response.data.name))
       .catch(err => console.log(err));
      }, [pokemonInfo[0].id]);
    useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${(pokemonInfo[0].id)-1}`)
       .then((resp) => setDecrease(resp.data.name))
       .catch(err => console.log(err));
    }, [pokemonInfo[0].id]);
  
  return (
    <div>
        <h2 className='pkm-til'>
        
          <Link style={pokemonInfo[0].id===1?style:disp} to={`/pokemon/${decr}`}><ArrowLeftOutlined  className='left abs'/></Link>
        {name}
        <Link to={`/pokemon/${ince}`}><ArrowRightOutlined className='right abs' /></Link>
        </h2>
        
        
    <div className='pokemon-conainer'>
        <div className='img'><img width="500px" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}/></div>
        
        <div className="PokemonInfo">
          {

          }
            <details>
                <summary>abilities:</summary>
                <ul>
                
                </ul>
            </details>
            
            <p>id: {pokemonInfo[0].id}</p>
            <p>hp: {pokemonInfo[0].hp}</p>
            <p>attack: {pokemonInfo[0].attack}</p>
            <p>defense: {pokemonInfo[0].defense}</p>
            <p>special-attack: {pokemonInfo[0].specialAttack}</p>
            <p>special-defense: {pokemonInfo[0].specialDefense}</p>
            <p>speed: {pokemonInfo[0].speed}</p>
            <p>weight: {pokemonInfo[0].weight}</p>
            <p>height: {pokemonInfo[0].height}</p>
        </div>
    </div>
    </div>
  )
}

export default PokemonInfo