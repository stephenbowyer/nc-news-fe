import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../contexts/User.jsx';

const Article = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <header>
            <span className="header-top">
                <span className="header-title"><h1>Northcoders News</h1></span>
                <span className="header-login">
                    {loggedInUser.username ? (<>
                            <span className="nav-item">
                                <Link to='/login'>Logout</Link> <span className="header-username">{loggedInUser.username}</span>
                                <img className="avatar-image" src={loggedInUser.avatar_url}/>
                            </span>
                            </>)
                        :   <Link className="nav-item" to='/login'>Login</Link>
                    }
                </span>
            </span>
            <nav>
                <Link className="nav-item" to='/topics'>Topics</Link>
                <Link className="nav-item" to='/articles'>All Articles</Link>
            </nav>
        </header>
    )

}

export default Article;