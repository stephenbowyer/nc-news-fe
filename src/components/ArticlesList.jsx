import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils.js';
import ArticleCard from './ArticleCard.jsx';

const ArticlesList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [allArticles, setAllArticles] = useState([]);
    const [sortBy, setSortBy] = useState('created_at'); // default: sort by date
    const [sortDirection, setSortDirection] = useState('desc'); // default: newest first
    const [articleListMessage, setArticleListMessage] = useState('Loading...');

    const topic = searchParams.get('topic');

    useEffect(() => {
        setArticleListMessage('Loading...');
        fetchArticles(topic, sortBy, sortDirection).then(({articles}) => {
            setAllArticles(articles);
            setArticleListMessage('');
        }).catch((result) => {
            if (result.response.status === 404){
                setArticleListMessage('⛔ Topic Not Found');
            }else{
                setArticleListMessage('⛔ Error Loading Topic');
            }
        });
    }, [topic, sortBy, sortDirection]);

    return (
        <>
        <h2>{topic ? "Topic: "+topic : "All Topics"}</h2>
        <div className="sort-outer">
            <div className="sort-by">Sort By:
                <span className={sortBy==="created_at" ? "sort-type sort-selected" : "sort-type"} onClick={() => setSortBy("created_at")} title="Date">📅</span>
                <span className={sortBy==="comment_count" ? "sort-type sort-selected" : "sort-type"} onClick={() => setSortBy("comment_count")} title="Number of Comments">✉️</span>
                <span className={sortBy==="votes" ? "sort-type sort-selected" : "sort-type"} onClick={() => setSortBy("votes")} title="Number of Votes">🔼</span>
            </div>
            <div className="sort-dir">Direction:
                <span className={sortDirection==="asc" ? "sort-type sort-selected" : "sort-type"} onClick={() => setSortDirection("asc")} title="Ascending">⬆️</span>
                <span className={sortDirection==="desc" ? "sort-type sort-selected" : "sort-type"} onClick={() => setSortDirection("desc")} title="Descending">⬇️</span>
            </div>
        </div>
        {allArticles.length === 0 ? <p className="topics-message">{articleListMessage}</p> : null }
        <ul className="article-list">
        {allArticles.map((article, index) => (<li className="article-item" key={"articlecard"+index}><ArticleCard article={article} /></li>))}
        </ul>
        </>
    );

}
export default ArticlesList;