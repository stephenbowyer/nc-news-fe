import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchArticle, fetchComments, upVoteArticle } from '../utils.js';
import CommentCard from './CommentCard.jsx';
import AddComment from './AddComment.jsx';

const Article = () => {
    const username = "grumpy19"; // hard coded user
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [allowVote, setAllowVote] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [articleMessage, setArticleMessage] = useState('Loading...');
    const [commentsMessage, setCommentsMessage] = useState('');

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

    const upVote = () => {
        if (allowVote){
            setFeedback('');
            updateVoteDisplay(1);
            setAllowVote(false);
            upVoteArticle(article_id).catch(() => {
                updateVoteDisplay(-1);
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
                <span className="author">By {article.author}</span>
                <span className={allowVote ? 'up-vote clickable' : 'up-vote'} onClick={upVote} title="Upvote Article">🔼{article.votes}</span>
                <span className="comments" title="Number Of Comments">✉️{comments.length}</span>
                <span className="article-feedback">{feedback}</span>
            </div>
            <div className="article-body">{article.body}</div>
            <h3>Comments</h3>
            {commentsMessage ? <p className="article-comments-message">{commentsMessage}</p> : null }
            <ul className="comments-list">
                <li className="comment-item newcomment" key="new-comment"><AddComment article_id={article_id} setComments={setComments} username={username} /></li>
                {comments.length > 0 ? comments.map((comment) => (<li className="comment-item" key={"articlecard"+comment.comment_id}><CommentCard comment={comment} username={username} setComments={setComments} /></li>)) : <li>No comments yet. Be the first to have your say.</li>}
            </ul>
            </>
        ) : <p className="article-message">{articleMessage}</p> }
        </>
    );
}

export default Article;