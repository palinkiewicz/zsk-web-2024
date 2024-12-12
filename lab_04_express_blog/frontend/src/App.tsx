import { Route, Routes, Link } from "react-router"
import Home from './pages/Home.tsx'
import CategoryList from './pages/CategoryList.tsx'
import Post from './pages/Post.tsx'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="categories">Category List</Link>
      </nav>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path="categories" element={ <CategoryList /> } />
        <Route path="post/:id" element={ <Post /> } />
      </Routes>
      <footer>Author: palinkiewicz</footer>
    </>
  )
}
