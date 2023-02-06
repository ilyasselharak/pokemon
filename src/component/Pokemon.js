import React from 'react'
import "../styles/pokemon.css"
function Pokemon({pokemon}) {
    const img = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
  return (
    <div>
        <a href={`/pokemon/${pokemon.name}`}>
        <img height="150px" width="100px" src={img} />
        <p>{pokemon.name}</p>
        </a>
    </div>
  )
}

export default Pokemon