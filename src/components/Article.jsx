import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchArticle, fetchComments } from '../utils.js';
import CommentCard from './CommentCard.jsx';


const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchArticle(article_id).then(({article}) => {
            setArticle(article);
        });
        fetchComments(article_id).then(({comments}) => {
            setComments(comments);
        });
    }, []);

    return (
        <>
        {Object.keys(article).length > 0 ? (
            <>
            <h2>{article.title}</h2>
            <img className="article-image" src={article.article_img_url} />
            <div>
                <span className="article-date">Posted {new Date(Date.parse(article.created_at)).toLocaleString()}</span>
                <span className="author">By {article.author}</span>
                <span className="up-vote">🔼{article.votes}</span>
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