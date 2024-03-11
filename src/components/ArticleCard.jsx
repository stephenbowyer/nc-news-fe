const ArticleCard = ({article}) => {
    return (
        <>
        <img className="article-image" src={article.article_img_url} />
        <span className="article-title">{article.title}</span>
        <span className="author">By {article.author}</span>
        <span className="up-vote">🔼{article.votes}</span>
        <span className="comments">✉️{article.comment_count}</span>
        </>
    );
}
export default ArticleCard;