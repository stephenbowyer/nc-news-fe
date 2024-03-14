import { useState, useContext } from "react";
import { postComment } from '../utils.js';

import UserContext from '../contexts/User.jsx';

const AddComment = ({article_id, setComments}) => {
    const [newCommentBody, setNewCommentBody] = useState('');
    const [feedback, setFeedback] = useState('');
    const {loggedInUser} = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newCommentBody.trim().length > 0){
            setFeedback('');
            postComment(article_id, loggedInUser.username, newCommentBody).then(({comment}) => {
                setComments((originalComments) => [comment, ...originalComments]);
                setNewCommentBody('');
            }).catch(() => {
                setFeedback('⛔ Error Posting Commment');
            })
        }else{
                setFeedback('⛔ Comment Too Short');
        }
    }

    const updateCommentBody = (event) => {
        setNewCommentBody(event.target.value);
        setFeedback('');
    }
 
    return (
        <>
        <form className="new-comment-form" onSubmit={handleSubmit}>
            <textarea className="new-comment-body" name="body" value={newCommentBody} onChange={updateCommentBody} placeholder="New Comment..."></textarea>
            <button className="new-comment-button" disabled={!newCommentBody}>Post Comment</button>
            <img className="avatar-image" src={loggedInUser.avatar_url} title={loggedInUser.username}/>
            <span className="new-comment-feedback">{feedback}</span>
        </form>
        </>
    );

}

export default AddComment;