import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils.js';
import ArticleCard from './ArticleCard.jsx';

const ArticlesList = () => {
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        fetchArticles().then(({articles}) => {
            setAllArticles(articles);
        });
    }, []);
    return (
        <>
        <ul className="article-list">
        {allArticles.map((article, index) => (<li className="article-item" key={"articlecard"+index}><ArticleCard article={article} /></li>))}
        </ul>
        </>
    );

}
export default ArticlesList;