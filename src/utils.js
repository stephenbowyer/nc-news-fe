import axios from 'axios'

const marketApi = axios.create({
    baseURL: 'https://nc-news-40gp.onrender.com/api'
})

export const fetchArticles = () => {
    return marketApi.get('/articles')
    .then((response) => {
        return response.data
    })
}

export const fetchArticle = (articleId) => {
    return marketApi.get(`/articles/${articleId}`)
    .then((response) => {
        return response.data
    })
}

export const upVoteArticle = (articleId, votes = 1) => {
    return marketApi.patch(`/articles/${articleId}`, {inc_votes: votes})
    .then((response) => {
        return response.data
    })
}

export const fetchComments = (articleId) => {
    return marketApi.get(`/articles/${articleId}/comments`)
    .then((response) => {
        return response.data
    })
}

export const postComment = (articleId, username, body) => {
    return marketApi.post(`/articles/${articleId}/comments`, {username, body})
    .then((response) => {
        return response.data
    })   
}

export const deleteComment = (commentId) => {
    return marketApi.delete(`/comments/${commentId}`)
    .then((response) => {
        return response.data
    })
}