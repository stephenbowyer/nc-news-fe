import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AllUsersContext from '../contexts/AllUsers.jsx';

const ArticleCard = ({article}) => {
    const {userListByUser} = useContext(AllUsersContext);

    return (
        <>
        <Link to={"/article/"+article.article_id}>
            <img className="article-image" src={article.article_img_url} />
            <span className="article-title">{article.title}</span>
        </Link>
        <span className="author" title={article.author}>By {userListByUser[article.author].name}
            <img className="avatar-image" src={userListByUser[article.author].avatar_url}/></span>
        <span className="up-vote">👍{article.votes}</span>
        <span className="comments">✉️{article.comment_count}</span>
        </>
    );
}
export default ArticleCard;