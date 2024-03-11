import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchArticle } from '../utils.js';

const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        fetchArticle(article_id).then(({article}) => {
            setArticle(article);
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
            </>
        ) : <p className="loading">Loading...</p> }
        </>
    );
}

export default Article;