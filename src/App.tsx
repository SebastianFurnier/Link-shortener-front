import './App.css'
import Home from './pages/home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RedirectHandler from './RedirectHandler';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<RedirectHandler />} />
        </Routes>
      </Router>
      <Home />
    </>
  )
}

export default App
