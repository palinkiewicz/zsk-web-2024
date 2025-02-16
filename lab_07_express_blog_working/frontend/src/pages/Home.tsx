import { Link } from 'react-router';
import { useCategories, usePosts } from '../api/api';

export default function Home() {
    const posts = usePosts();
    const categories = useCategories();

    return (
        <div className='home-view'>
            <header className='welcome-banner'>
                <h1>Welcome to Our Blog!</h1>
                <p>Discover interesting posts on a variety of topics.</p>
            </header>
            <section className='post-list'>
                <h2>Latest Posts</h2>
                <div className='posts-container'>
                    {(posts.isLoading || categories.isLoading) && (
                        <h3>Loading...</h3>
                    )}
                    {(posts.isError || categories.isError) && (
                        <h3>Error occurred.</h3>
                    )}
                    {!posts.isLoading &&
                        !categories.isLoading &&
                        posts.data?.map((post) => (
                            <div className='post-entry' key={`post${post.id}`}>
                                <h3>{post.title}</h3>
                                <h4>
                                    {
                                        categories.data?.filter(
                                            (e) => e.id == post.categoryId
                                        )[0].title
                                    }
                                </h4>
                                <h5>
                                    {new Date(post.createdAt).toLocaleString()}
                                </h5>
                                <Link
                                    to={`/post/${post.id}`}
                                    className='read-more'
                                >
                                    Read More
                                </Link>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}
