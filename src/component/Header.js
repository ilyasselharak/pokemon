import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {SearchOutlined} from '@ant-design/icons';

function Header() {
  const [data,setData]=useState([]);
  const [list,setList]=useState();
  const [ev,setEv]=useState(false);
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1279')
    .then(res=>{
     setData(res.data.results)
    }).catch(err=>{
      console.log(err)
    })
  }, [])
  
  const handleInput=(e)=>{
    e.preventDefault();
    let search= data?.filter(item=>item?.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (search.length!==0){
      setEv(true)
    }
    
    
    setList(search)
    
  }
  return (
    <div className='flex header-container'>
     <h1>Pokemon</h1>
     <div className="ser-container">
        <div className="wrapper">
          <input onChange={handleInput} className="input-container" type="text" placeholder="select team from the list"/>
          <button><SearchOutlined /></button>
          <div className={ev?"results":"none"} id="res">
             <ul>
              {list?.map(item => {
              return (
              <li>
              <img src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`} alt={item.name}/>
              {item.name}
               </li>)
             })}
             </ul>
           </div>
          </div>
     </div>
    </div>
  )
}

export default Header