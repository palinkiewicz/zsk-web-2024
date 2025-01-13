import { Route, Routes } from 'react-router'
import PostList from './pages/PostListView'
import PostView from './pages/PostView'

function App() {
  return (
    <Routes>
      <Route index element={ <PostList /> }></Route>
      <Route path='post/:id' element={ <PostView /> }></Route>
    </Routes>
  )
}

export default App
