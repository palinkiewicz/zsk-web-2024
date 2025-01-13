import { useState, useEffect } from "react";
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
    const [post, setPost] = useState<Post | null>(null);
    const [loadingPost, setLoadingPost] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [loadingUser, setLoadingUser] = useState<boolean>(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then((json: Post) => {
                setPost(json);
                setLoadingPost(false);
                setLoadingUser(post?.id !== null);
            });
    }, []);

    useEffect(() => {
        if (post === null) return

        fetch(`https://jsonplaceholder.typicode.com/users/${post?.id}`)
            .then(response => response.json())
            .then((json: User) => {
                setUser(json);
                setLoadingUser(false);
            });
    }, [post?.id])

    return (
        <>
            <a href='/'>Back to the posts' list</a>
            {loadingPost && <p>Loading post...</p>}
            {!loadingPost && post?.id === null && <p>Post not found</p>}
            {post?.id !== null && <div>
                <h6>Post:</h6>
                <h3>{post?.title}</h3>
                <p>{post?.body}</p>
            </div>}
            {loadingUser && <p>Loading user...</p>}
            {user?.id !== null && <div>
                <h6>User:</h6>
                <h3>{user?.name}</h3>
                <h4>{user?.username}</h4>
                <h5>{user?.email}</h5>
                <p>{user?.phone}</p>
                <p>{user?.email}</p>
            </div>}
        </>
    )
}