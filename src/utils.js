import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-40gp.onrender.com/api'
})

export const fetchArticles = (topic, sortBy, sortDir) => {
    const queryParams = {params: {topic, sort_by: sortBy, order: sortDir}};
    return newsApi.get('/articles', queryParams)
    .then((response) => {
        return response.data
    });
}

export const fetchArticle = (articleId) => {
    return newsApi.get(`/articles/${articleId}`)
    .then((response) => {
        return response.data
    })
}

export const upVoteArticle = (articleId, votes = 1) => {
    return newsApi.patch(`/articles/${articleId}`, {inc_votes: votes})
    .then((response) => {
        return response.data
    })
}

export const fetchComments = (articleId) => {
    return newsApi.get(`/articles/${articleId}/comments`)
    .then((response) => {
        return response.data
    })
}

export const postComment = (articleId, username, body) => {
    return newsApi.post(`/articles/${articleId}/comments`, {username, body})
    .then((response) => {
        return response.data
    })   
}

export const deleteComment = (commentId) => {
    return newsApi.delete(`/comments/${commentId}`)
    .then((response) => {
        return response.data
    })
}

export const fetchTopics = () => {
    return newsApi.get('/topics')
    .then((response) => {
        return response.data
    })
}

export const fetchUsers = () => {
    return newsApi.get('/users')
    .then((response) => {
        return response.data
    })
}