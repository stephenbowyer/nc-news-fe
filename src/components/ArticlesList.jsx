import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils.js';
import ArticleCard from './ArticleCard.jsx';

const ArticlesList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [allArticles, setAllArticles] = useState([]);
    const topic = searchParams.get('topic');

    useEffect(() => {
        fetchArticles(topic).then(({articles}) => {
            setAllArticles(articles);
        });
    }, [topic]);

    return (
        <>
        <h2>{topic ? "Topic: "+topic : "All Topics"}</h2>
        <ul className="article-list">
        {allArticles.map((article, index) => (<li className="article-item" key={"articlecard"+index}><ArticleCard article={article} /></li>))}
        </ul>
        </>
    );

}
export default ArticlesList;