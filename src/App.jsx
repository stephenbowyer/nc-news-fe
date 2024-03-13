import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TopicsList from './components/TopicsList.jsx';
import ArticlesList from './components/ArticlesList.jsx';
import Article from './components/Article.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<ArticlesList />} />
      <Route path='/articles' element={<ArticlesList />} />
      <Route path='/article/:article_id' element={<Article />} />
      <Route path='/topics' element={<TopicsList />} />
    </Routes>
    </>
  );
}

export default App;