import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import TopicsList from './components/TopicsList.jsx';
import ArticlesList from './components/ArticlesList.jsx';
import Article from './components/Article.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';

import UserContext from './contexts/User.jsx';
import AllUsersContext from './contexts/AllUsers.jsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [userListByUser, setUserListByUser] = useState([]);

  return (
    <>
      <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <AllUsersContext.Provider value={{userList, setUserList, userListByUser, setUserListByUser}}>
          <Header />
          {loggedInUser.username ?
          <Routes>
            <Route path='/' element={<ArticlesList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/articles' element={<ArticlesList />} />
            <Route path='/article/:article_id' element={<Article />} />
            <Route path='/topics' element={<TopicsList />} />
          </Routes>
          : <Login />
          }
        </AllUsersContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;