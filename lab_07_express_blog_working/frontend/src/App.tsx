import { Route, Routes, Link } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home.tsx';
import CategoryList from './pages/CategoryList.tsx';
import Post from './pages/Post.tsx';

export default function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <nav>
                <Link to='/'> Home </Link>
                <Link to='categories'> Category List </Link>
            </nav>
            <main>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='categories' element={<CategoryList />} />
                    <Route path='post/:id' element={<Post />} />
                </Routes>
            </main>
            <footer> Author: palinkiewicz </footer>
        </QueryClientProvider>
    );
}
