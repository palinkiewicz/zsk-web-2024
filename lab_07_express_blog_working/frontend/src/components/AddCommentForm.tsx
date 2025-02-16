import { FormEvent, useState } from 'react';
import { useCreateComment } from '../api/api';

export default function AddCommentForm({ postId }: { postId: number }) {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const createComment = useCreateComment();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createComment.mutate({ author, text, postId });
    };

    return (
        <form className='add-comment' onSubmit={onSubmit}>
            <div className='field'>
                <label htmlFor='author'>Author</label>
                <input
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className='field'>
                <label htmlFor='body'>Body</label>
                <textarea
                    name='body'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button type='submit'>Add comment</button>
        </form>
    );
}
