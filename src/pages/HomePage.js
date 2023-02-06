import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Stack, Pagination} from '@mui/material';
import Pokemon from '../component/Pokemon';

function HomePage() {
  const [name,setName]=useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset]= useState(0)
  
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
    
    if(value===1){
      setOffset(0)
    }
    
    
    

    console.log(`${value}${offset}${page}`)
    if(value>page){
      console.log(true)
    }
    if(value<page){
      if(value===1){
        setOffset(0)
      }else if(value===2){
        setOffset(20)
        
      }else{
        setOffset(value*20)
      }
      
    }else{
      if(value===2){
        setOffset(20)
      }else{
        setOffset(value*20)
      }
      
    }
    
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
      <Pagination count={63} color="primary" page={page} onChange={handleChange} />
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