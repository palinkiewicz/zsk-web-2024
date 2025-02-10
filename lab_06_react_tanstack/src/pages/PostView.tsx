import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import { Post } from "./PostListView";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export default function PostView() {
    const { id } = useParams();

    const post = useQuery<Post>({
        queryKey: ['post'],
        queryFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (!response.ok) throw new Error("Couldn't fetch the post");
            return response.json();
        },
        enabled: !!id
    });

    const user = useQuery<User>({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${post.data?.id}`);
            if (!response.ok) throw new Error("Couldn't fetch the user");
            return response.json();
        },
        enabled: !!post.data?.id
    });

    return (
        <>
            <h1>Pretty simple post details</h1>
            <a href='/'>Back to the posts' list</a>
            {post.isLoading && <p className="loading">Loading post...</p>}
            {!post.isLoading && post.data?.id === null && <p className="not-found">Post not found</p>}
            {post.data?.id !== null && <div className="post-view">
                <h2>Post:</h2>
                <h3>{post.data?.title}</h3>
                <p>{post.data?.body}</p>
            </div>}
            {user.isLoading && <p className="loading">Loading user...</p>}
            {user.data?.id !== null && <div className="user-view">
                <h2>User:</h2>
                <h3>{user.data?.name}</h3>
                <h4>{user.data?.username}</h4>
                <h5>{user.data?.email}</h5>
                <p>{user.data?.phone}</p>
                <p>{user.data?.email}</p>
            </div>}
        </>
    )
}