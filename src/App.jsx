import { Routes, Route } from 'react-router-dom'
import AccessCode from './pages/AccessCode'
import VotingArea from './pages/VotingArea'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AccessCode />} />
      <Route path="/voting/:code" element={<VotingArea />} />
    </Routes>
  )
}

export default App