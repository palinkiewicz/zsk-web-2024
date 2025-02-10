import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';
import PostList from './pages/PostListView';
import PostView from './pages/PostView';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={ <PostList /> }></Route>
        <Route path='post/:id' element={ <PostView /> }></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
