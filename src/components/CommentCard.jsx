const CommentCard = ({comment}) => {
    return (
        <>
        <span className="comment-text">{comment.body}</span>
        <div className="comment-controls">
            <span className="author">By {comment.author}</span>
            <span className="up-vote">🔼{comment.votes}</span>
        </div>
        </>
    );
}
export default CommentCard;