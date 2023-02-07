import { createContext, useState } from "react";
const PokeData = createContext();

export function PokeProvider({children}){
    const [pokemonData,setPokemonData] =useState([])
    
    return(
        <PokeData.Provider value={{pokemonData,setPokemonData}}>{children}</PokeData.Provider>
    )
}
export default PokeData