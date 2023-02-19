import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </>
  )
}

export default App
