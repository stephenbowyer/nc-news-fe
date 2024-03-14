import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../contexts/User.jsx';

const Article = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <header>
            <h1>Northcoders News</h1>
            <nav>
                <Link to='/topics'>Topics</Link>
                <Link to='/articles'>All Articles</Link>
                {loggedInUser.username ? (<>
                    <Link to='/login'>Logout</Link>{loggedInUser.username}
                    <img className="avatar-image" src={loggedInUser.avatar_url}/>
                    </>)
                :   <Link to='/login'>Login</Link>
                }
            </nav>
        </header>
    )

}

export default Article;