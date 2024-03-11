import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ArticlesList from './components/ArticlesList.jsx';
import Article from './components/Article.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ArticlesList />} />
      <Route path='/article/:article_id' element={<Article />} />
    </Routes>
    </>
  );
}

export default App;