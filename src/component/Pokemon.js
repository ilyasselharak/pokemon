import React from 'react'
import "../styles/pokemon.css"
import { Link } from 'react-router-dom'
function Pokemon({pokemon}) {
  
    const img = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
  return (
    <div>
        <Link to={`/pokemon/${pokemon.name}`}>
        <img height="150px" width="100px" src={img} />
        <p>{pokemon.name}</p>
        </Link>
    </div>
  )
}

export default Pokemon