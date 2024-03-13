import {Link} from 'react-router-dom'

const TopicCard = ({topic, topicImage}) => {
    return (
        <>
            <Link to={'/articles?topic='+topic.slug}>
                <div className="topic-outer">
                    <span className="topic-name">{topic.slug}</span>
                    <span className="topic-description">{topic.description}</span>
                    <img className="topic-image" src={topicImage}/>
                </div>
            </Link>
        </>
    );
}
export default TopicCard;