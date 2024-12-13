import { useParams } from "react-router"
import AddCommentForm from "../components/AddCommentForm";

export default function Post() {
    const { id } = useParams();

    return (
        <div className="post-view">
            <div className="post-data">
                <h1>Post title will be here ID: {id}</h1>
                <h6>DD-MM-YYYY HH24:MI</h6>
                <p>Post body.</p>
            </div>
            <div className="post-comments">
                <h2>Comments</h2>
                <AddCommentForm />
                <div className="no-comments">No comments yet</div>
            </div>
        </div>
    );
}
