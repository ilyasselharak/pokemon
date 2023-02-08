import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Stack, Pagination} from '@mui/material';
import Pokemon from '../component/Pokemon';
import ClipLoader from "react-spinners/ClipLoader";

function HomePage() {
  const [name,setName]=useState([]);
  const [offset, setOffset]= useState(0)
  let [loading, setLoading] = useState(false);
  const iconDisplay=() => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  };
  
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
      <Pagination onClick={() => iconDisplay()} count={63} color="primary" onChange={handleChange} />
      </Stack>
      
      {
        loading ? 
        <ClipLoader className={'container'} color={"#36d7b7"} loading={loading}  size={150} /> 
        :
        <div className='container'>{
          name.map(pokemon=>{
            return <Pokemon pokemon={pokemon}/>
          })
        }
        
        </div>
      }
    </div>
  )
}

export default HomePage
