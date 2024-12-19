import { Route, Routes } from 'react-router'
import './App.css'
import PostList from './pages/PostList'
import Post from './pages/Post'

function App() {
  return (
    <Routes>
      <Route index element={ <PostList /> }></Route>
      <Route path='post/:id' element={ <Post /> }></Route>
    </Routes>
  )
}

export default App
