import { Route, Routes } from "react-router"
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Help from './pages/Help.tsx'

export default function App() {
  return (
    <Routes>
      <Route index element={ <Home /> } />
      <Route path="about" element={ <About /> } />
      <Route path="help" element={ <Help /> } />
    </Routes>
  )
}
