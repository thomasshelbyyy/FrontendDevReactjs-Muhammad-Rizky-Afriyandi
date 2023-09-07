import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import DetailView from './pages/Detail'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
