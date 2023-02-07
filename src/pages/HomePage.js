import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Stack, Pagination} from '@mui/material';
import Pokemon from '../component/Pokemon';

function HomePage() {
  const [name,setName]=useState([]);
  const [offset, setOffset]= useState(0)
  const handleChange = (e, value) => {
    e.preventDefault();

    setOffset((value-1)*20)
    console.log(`${value}${offset}`)
  };
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}`)
    .then(res=>{
      setName(res.data.results)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [offset])
  
  return (
    <div className=' margin-top flex'>
      
     
      <Stack className="wid" spacing={2}>
      <Pagination count={63} color="primary" onChange={handleChange} />
      </Stack>
      <div className='container'>{
        name.map(pokemon=>{
          return <Pokemon pokemon={pokemon}/>
        })
      }
      
      </div>
    </div>
  )
}

export default HomePage