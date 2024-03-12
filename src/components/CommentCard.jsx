import { useState } from "react";
import { deleteComment } from "../utils.js";

const CommentCard = ({comment, username, setComments}) => {
    const [feedback, setFeedback] = useState('');
    const [deleting, setDeleting] = useState(false);

    const removeComment = () => {
        setFeedback('');
        if (!deleting){
            setDeleting(true);
            deleteComment(comment.comment_id).then(() => {
                setComments((originalComments) => {
                    const newComments = [...originalComments];
                    return newComments.filter((currComment) => currComment.comment_id !== comment.comment_id);
                })
            }).catch(() => {
                setFeedback('Unable to delete comment');
                setDeleting(false);
            });
        }
    }

    return (
        <div className={!deleting ? 'comment-container' : 'comment-container comment-deleting'}>
            <span className="comment-text">{comment.body}</span>
            <div className="comment-controls">
                <span className="author">By {comment.author}</span>
                <span className="up-vote" title="Upvote Comment">🔼{comment.votes}</span>
                {comment.author === username ? <span className="delete clickable" onClick={removeComment} title="Delete Comment">❌</span> : null}
                <span className="comment-feedback">{feedback}</span>
            </div>
        </div>
    );
}
export default CommentCard;