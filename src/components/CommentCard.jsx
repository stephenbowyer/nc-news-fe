import { useState, useContext } from "react";
import { deleteComment } from "../utils.js";

import UserContext from '../contexts/User.jsx';
import AllUsersContext from '../contexts/AllUsers.jsx';

const CommentCard = ({comment, setComments}) => {
    const [feedback, setFeedback] = useState('');
    const [deleting, setDeleting] = useState(false);
    const {userListByUser} = useContext(AllUsersContext);
    const {loggedInUser} = useContext(UserContext);

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
                <span className="author" title={comment.author}>By {userListByUser[comment.author].name}
                    <img className="avatar-image" src={userListByUser[comment.author].avatar_url}/></span>
                <span className="up-vote" title="Upvote Comment">🔼{comment.votes}</span>
                {comment.author === loggedInUser.username ? <span className="delete clickable" onClick={removeComment} title="Delete Comment">❌</span> : null}
                <span className="comment-feedback">{feedback}</span>
            </div>
        </div>
    );
}
export default CommentCard;