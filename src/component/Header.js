import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {SearchOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Header() {
  
  const [data,setData]=useState([]);
  const [list,setList]=useState([]);
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
    setList(e.target.value ? search : [])
    if(e.target.value.length===0){
      setList([])
    }
    console.log(list)
  }
  return (
    <div className='flex header-container'>
     <Link to={"/"}><h1>Pokemon</h1></Link>
     <div className="ser-container">
        <div className="wrapper">
          <input onChange={handleInput} className="input-container" type="text" placeholder="select team from the list"/>
          <button><SearchOutlined /></button>
          <div className={list.length ? "results" : "none"} >
             <ul>
              {list?.map(item => {
              return (
              <li>
              <Link className='flex-item' to={`/pokemon/${item.name}`}>
              <img width="100px" height="100px" src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`} alt={item.name}/>
              {item.name}
              </Link>
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