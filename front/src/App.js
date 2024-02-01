import './App.css';
import NavBar from './components/navbar';
import { Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import PostPage from './pages/postPage';
import GetPage from './pages/getPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/post' element={<PostPage />} />
        <Route path='/get' element={<GetPage />} />
      </Routes>
    </>
  );
}

export default App;
