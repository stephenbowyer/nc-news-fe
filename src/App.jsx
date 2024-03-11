import { useState } from 'react'
import './App.css'
import ArticlesList from './components/ArticlesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ArticlesList />
    </>
  );
}

export default App
