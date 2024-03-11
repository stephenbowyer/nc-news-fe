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
