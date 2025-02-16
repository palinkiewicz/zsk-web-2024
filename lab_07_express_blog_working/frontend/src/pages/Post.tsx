import { useParams } from 'react-router';
import AddCommentForm from '../components/AddCommentForm';
import { useComments, usePost } from '../api/api';

export default function Post() {
    const { id } = useParams();
    const post = usePost(Number(id));
    const comments = useComments(Number(id));

    return (
        <>
            {post.isLoading && <h3>Loading...</h3>}
            {post.isError && <h3>Error occurred.</h3>}
            {post.data && (
                <div className='post-view'>
                    <div className='post-data'>
                        <h1>{post.data.title}</h1>
                        <h6>
                            {new Date(post.data.createdAt).toLocaleString()}
                        </h6>
                        <p>{post.data.content}</p>
                    </div>
                    <div className='post-comments'>
                        <h2>Comments</h2>
                        <AddCommentForm postId={Number(id)} />
                        {comments.isLoading && <h3>Loading...</h3>}
                        {comments.isError && <h3>Error occurred.</h3>}
                        {!comments.isLoading &&
                            !comments.isError &&
                            comments.data?.length == 0 && (
                                <h3>No comments yet.</h3>
                            )}
                        {comments.data
                            ?.sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime()
                            )
                            .map((comment) => (
                                <div className='comment'>
                                    <p>{comment.text}</p>
                                    <h5>
                                        {comment.author} at{' '}
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleString()}
                                    </h5>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}
