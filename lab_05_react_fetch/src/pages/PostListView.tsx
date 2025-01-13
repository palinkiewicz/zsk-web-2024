import { useEffect, useState } from "react";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((json: Post[]) => {
                setPosts(json);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && posts.length === 0 && <p>No posts found</p>}
            <ul>
                {posts?.map((post: Post, idx: number) =>
                    <li key={`post-${idx}`}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <a href={`/post/${post.id}`}>See the post</a>
                    </li>
                )}
            </ul>
        </>
    )
}