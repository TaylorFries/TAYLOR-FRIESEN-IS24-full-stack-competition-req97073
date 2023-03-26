import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import ProjectList from './pages/ProjectList';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projectList" element={<ProjectList />} /> 
            <Route path="/projectList/:projectId" element={<ProjectPage />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
