import { useState } from "react";
import { postComment } from '../utils.js';

const AddComment = ({article_id, setComments}) => {
    const username = "grumpy19"; // hard coded user
    const [newCommentBody, setNewCommentBody] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newCommentBody.length > 0){
            const newComment = {
                comment_id: 'newcomment',
                body: newCommentBody,
                article_id: article_id,
                author: username,
                votes: 0,
                created_at: Date.now()
            }
            setComments((originalComments) => {
                const newComments = [newComment, ...originalComments];
                return newComments;
            });
            setNewCommentBody('');
            postComment(article_id, username, newComment.body).then(({comment}) => {
                setComments((originalComments) => {
                    const newComments = [...originalComments];
                    return newComments.map((currComment) => {
                        if (currComment.comment_id === 'newcomment'){
                            return comment;
                        }
                        return currComment;
                    });
                });
                setFeedback('');
            }).catch(() => {
                setNewCommentBody(newComment.body);
                setComments((comments) => comments.filter((currComment) => currComment.comment_id !== 'newcomment'));
                setFeedback('Error posting');
            })
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