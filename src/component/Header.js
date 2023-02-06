import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {SearchOutlined} from '@ant-design/icons';

function Header() {

  const [allName,setallName]=useState()
  const [sear,setSer]=useState([])
  const [ev,setEv]=useState(false)


  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1279}`)
    .then(res=>{
      setallName(res.data.results)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])
  const handleInput=(e)=>{
    let search= allName?.filter(item=>item?.name.toLowerCase().includes(e.target.value.toLowerCase()))
    
    setSer(search)
    function renderResults(sear) {
  
      
        
        let content = sear.map((item) => {
          return `<a href="/pokemon/${item.name}" ><li><img width="70px" src=${`https://img.pokemondb.net/artwork/large/${item.name}.jpg`} />${item.name}</li></a>`;
        })
        .join('');
        if(content!==0){
          setEv(true)
        }else{
          setEv(false)
        }
        
        searchWrapper.classList.add('show');
        resultsWrapper.innerHTML = `<ul>${content}</ul>`;
        if(e.target.value.length===0){
          setEv(false)
        }
      
    }
    renderResults(sear);
  }
  const searchWrapper = document.querySelector('.wrapper');
  const resultsWrapper = document.querySelector('#res');

  return (
    <div className='flex header-container'>
      <h1>Pokemon</h1>
        
     <div className="ser-container">
        <div className="wrapper">
          <input onChange={handleInput}  name="search" className="input-container" id="search" type="text" placeholder="select team from the list"/>
          <button><SearchOutlined /></button>
          <div className={ev?"results":"none"} id="res">
             <ul>
             </ul>
           </div>
          </div>
     </div>
    </div>
  )
}

export default Header