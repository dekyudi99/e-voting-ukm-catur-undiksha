import { Routes, Route } from 'react-router-dom'
import AccessCode from './pages/AccessCode'
import VotingArea from './pages/VotingArea'
import { div } from 'framer-motion/client'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AccessCode />} />
        <Route path="/voting/:code" element={<VotingArea />} />
      </Routes>
    </div>
  )
}

export default App