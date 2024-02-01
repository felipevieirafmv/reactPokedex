import './App.css';
import NavBar from './components/navbar';
import { Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import PostPage from './pages/postPage';
import GetPage from './pages/getPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/post' element={<PostPage />} />
        <Route path='/get' element={<GetPage />} />
      </Routes>
    </>
  );
}

export default App;
