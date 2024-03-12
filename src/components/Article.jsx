import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchArticle, fetchComments, upVoteArticle } from '../utils.js';
import CommentCard from './CommentCard.jsx';


const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [allowVote, setAllowVote] = useState(true);

    useEffect(() => {
        fetchArticle(article_id).then(({article}) => {
            setArticle(article);
        });
        fetchComments(article_id).then(({comments}) => {
            setComments(comments);
        });
    }, []);

    const updateVoteDisplay = (value) => {
        setArticle((originalArticle) => {
            const newArticle = {...originalArticle};
            newArticle.votes = newArticle.votes + value;
            return newArticle;
        });
    }

    const upVote = () => {
        if (allowVote){
            updateVoteDisplay(1);
            setAllowVote(false);
            upVoteArticle(article_id).catch(() => {
                updateVoteDisplay(-1);
                setAllowVote(true);
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
                <span className={allowVote ? 'up-vote clickable' : 'up-vote'} onClick={upVote}>🔼{article.votes}</span>
                <span className="comments">✉️{article.comment_count}</span>
            </div>
            <div className="article-body">{article.body}</div>
            <h3>Comments</h3>
            <ul className="comments-list">
                {comments.length > 0 ? comments.map((comment) => (<li className="comment-item" key={"articlecard"+comment.comment_id}><CommentCard comment={comment} /></li>)) : <li>No comments yet. Be the first to have your say.</li>}
            </ul>
            </>
        ) : <p className="loading">Loading...</p> }
        </>
    );
}

export default Article;