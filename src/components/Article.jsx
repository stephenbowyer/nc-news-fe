import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { fetchArticle, fetchComments, upVoteArticle } from '../utils.js';
import CommentCard from './CommentCard.jsx';
import AddComment from './AddComment.jsx';

import AllUsersContext from '../contexts/AllUsers.jsx';

const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [allowVote, setAllowVote] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [articleMessage, setArticleMessage] = useState('Loading...');
    const [commentsMessage, setCommentsMessage] = useState('');
    const {userListByUser} = useContext(AllUsersContext);

    useEffect(() => {
        setArticleMessage('Loading...');
        fetchArticle(article_id).then(({article}) => {
            setArticle(article);
        }).catch((result) => {
            if (result.response.status === 404){
                setArticleMessage('⛔ Article Not Found');
            }else{
                setArticleMessage('⛔ Error Loading Article');
            }
        });
    }, [article_id]);

    useEffect(() => {
        if (Object.keys(article).length > 0){
            setCommentsMessage('');
            fetchComments(article_id).then(({comments}) => {
                setComments(comments);
            }).catch(() => {
                setCommentsMessage('⛔ Error Loading Comments');
            });
        }
    }, [article]);

    const updateVoteDisplay = (value) => {
        setArticle((originalArticle) => {
            const newArticle = {...originalArticle};
            newArticle.votes = newArticle.votes + value;
            return newArticle;
        });
    }

    const upVote = (votes = 1) => {
        if (allowVote){
            setFeedback('');
            updateVoteDisplay(votes);
            setAllowVote(false);
            upVoteArticle(article_id, votes).catch(() => {
                updateVoteDisplay(-votes);
                setAllowVote(true);
                setFeedback('Unable to update vote');
            });
        }
    }

    return (
        <>
        {Object.keys(article).length > 0 ? (
            <>
            <h2>{article.title}</h2>
            <img className="article-image" src={article.article_img_url} />
            <div>
                <span className="article-date">Posted {new Date(Date.parse(article.created_at)).toLocaleString()}</span>
                <span className="author" title={article.author}>By {userListByUser[article.author].name}
                    <img className="avatar-image" src={userListByUser[article.author].avatar_url}/></span>
                <span className="up-vote">
                    <span className={allowVote ? "clickable" : "unclickable"} onClick={() => upVote(1)} title="Upvote Comment">👍</span>
                    {article.votes}
                    <span className={allowVote ? "clickable" : "unclickable"} onClick={() => upVote(-1)} title="Downvote Comment">👎</span>
                </span>
                <span className="comments" title="Number Of Comments">✉️{comments.length}</span>
                <span className="article-feedback">{feedback}</span>
            </div>
            <div className="article-body">{article.body}</div>
            <h3>Comments</h3>
            {commentsMessage ? <p className="article-comments-message">{commentsMessage}</p> : null }
            <ul className="comments-list">
                <li className="comment-item newcomment" key="new-comment"><AddComment article_id={article_id} setComments={setComments} /></li>
                {comments.length > 0 ? comments.map((comment) => (<li className="comment-item" key={"articlecard"+comment.comment_id}><CommentCard comment={comment} setComments={setComments} /></li>)) : <li>No comments yet. Be the first to have your say.</li>}
            </ul>
            </>
        ) : <p className="article-message">{articleMessage}</p> }
        </>
    );
}

export default Article;