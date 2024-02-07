import './App.css';
import NavBar from './components/navbar';
import { Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import PostPage from './pages/postPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PokemonPage from './pages/pokemonPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/post' element={<PostPage />} />
        <Route path='/pokemon' element={<PokemonPage />} />
      </Routes>
    </>
  );
}

export default App;
