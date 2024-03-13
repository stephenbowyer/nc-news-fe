import { useEffect, useState } from 'react';
import { fetchArticles, fetchTopics } from '../utils.js';
import TopicCard from './TopicCard.jsx';

const TopicsList = () => {
    const [topics, setTopics] = useState([]);
    const [topicImages, setTopicImages] = useState({});

    useEffect(() => {
        fetchTopics().then(({topics}) => {
            setTopics(topics);
            const newTopicImages = {};
            topics.forEach((topic) => {
                fetchArticles(topic.slug).then(({articles}) => {
                    setTopicImages((origTopicImages) => {
                        const newTopicImages = {...origTopicImages};
                        newTopicImages[topic.slug] = articles[0].article_img_url;
                        return newTopicImages;
                    });
                })
            })
        });
    }, []);
    return (
        <>
        <h2>Topics</h2>
        <ul className="topics-list">
        {topics.map((topic) => (<li className="topic-item" key={"topiccard"+topic.slug}>
        <TopicCard topic={topic} topicImage={topicImages[topic.slug]} /></li>))}
        </ul>
        </>
    );

}
export default TopicsList;