
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PokemonInfo from './pages/PokemonInfo';
import Header from './component/Header';

function App() {
  
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/pokemon/:name" element={<PokemonInfo/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
