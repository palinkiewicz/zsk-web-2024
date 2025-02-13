import { Link } from "react-router";

export default function Home() {
    const posts = [
        { id: 1, title: "The Beauty of Programming", summary: "An introduction to the art of coding." },
        { id: 2, title: "Exploring the Cosmos", summary: "Discover the mysteries of the universe." },
        { id: 3, title: "Healthy Living Tips", summary: "How to maintain a balanced lifestyle." },
    ];

    return (
        <div className="home-view">
            <header className="welcome-banner">
                <h1>Welcome to Our Blog!</h1>
                <p>Discover interesting posts on a variety of topics.</p>
            </header>
            <section className="post-list">
                <h2>Latest Posts</h2>
                <div className="posts-container">
                    {posts.map(post => (
                        <div className="post-entry" key={`post${post.id}`}>
                            <h3>{post.title}</h3>
                            <p>{post.summary}</p>
                            <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
