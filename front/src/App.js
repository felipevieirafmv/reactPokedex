import './App.css';
import NavBar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import PostPage from './pages/postPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AlertProvider } from './context/alert';
import ProtectedRoute from './pages/ProtectRoute';
import AccessDenied from './pages/AcessDenied';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/pokemonPage';

function App() {
  return (

    <>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={
            <ProtectedRoute
              errorPage={<AccessDenied />}
              targetPage={<NavBar />}
            />
          }>
            <Route path='' element={<HomePage />} />
            <Route path='get' element={<PokemonPage />} />
            <Route path='post' element={<PostPage />} />
          </Route>
        </Routes>
      </AlertProvider>
    </>
  );
}

export default App;