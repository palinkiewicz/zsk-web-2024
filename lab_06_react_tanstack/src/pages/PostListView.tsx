import { useQuery } from "@tanstack/react-query";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostList() {
    const posts = useQuery<Post[]>({queryKey: ['posts'], queryFn: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error("Couldn't fetch the data");
        return response.json();
    }});

    return (
        <>
            <h1>Pretty simple post site</h1>
            {posts.isLoading && <p className="loading">Loading...</p>}
            {!posts.isLoading && posts.data?.length === 0 && <p className="not-found">No posts found</p>}
            <ul className="post-list">
                {posts.data?.map((post: Post, idx: number) =>
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