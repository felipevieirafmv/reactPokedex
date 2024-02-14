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
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ContainerTheme } from './styled';

function App() {
  const [theme, setTheme] = useState("light")

  const themeToggler = () => {
    theme === "light" ? setTheme('dark') : setTheme('light')
  }

  return (

    <>
      <AlertProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <ThemeProvider theme={theme === 'light' ? 'lightTheme' : 'darkTheme'}>
            <ContainerTheme>
              <Route path='/home' element={
                <ProtectedRoute
                  errorPage={<AccessDenied />}
                  targetPage={<NavBar />}
                />
              }>
                <Route path='' element={<HomePage />} />
                <Route path='get/:pkmName' element={<PokemonPage />} />
                <Route path='post' element={<PostPage />} />
              </Route>
            </ContainerTheme>
          </ThemeProvider>
        </Routes>
      </AlertProvider>
    </>
  );
}

export default App;