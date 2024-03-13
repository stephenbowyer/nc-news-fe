import { useState } from "react";
import { postComment } from '../utils.js';

const AddComment = ({article_id, setComments, username}) => {
    const [newCommentBody, setNewCommentBody] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newCommentBody.trim().length > 0){
            setFeedback('');
            postComment(article_id, username, newCommentBody).then(({comment}) => {
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
            <button className="new-comment-button" disabled={!newCommentBody}>Post Comment</button><span className="new-comment-feedback">{feedback}</span>
        </form>
        </>
    );

}

export default AddComment;