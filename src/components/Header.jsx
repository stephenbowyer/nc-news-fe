import {Link} from 'react-router-dom'
const Article = () => {
    return (
        <>
            <h1>Northcoders News</h1>
            <nav>
                <Link to='/topics'>Topics</Link>
                <Link to='/articles'>All Articles</Link>
            </nav>
        </>
    )

}

export default Article;