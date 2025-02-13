export default function AddCommentForm() {
    return (
        <form className="add-comment">
            <div className="field">
                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" />
            </div>
            <div className="field">
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body"></textarea>
            </div>
            <button>Add comment</button>
        </form>
    );
}