import { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUsers } from '../utils.js';

import LoginUserCard from './LoginUserCard.jsx';

import UserContext from '../contexts/User.jsx';
import AllUsersContext from '../contexts/AllUsers.jsx';

const Login = () => {
    const [loginFeedback, setLoginFeedback] = useState([]);
    const {setLoggedInUser} = useContext(UserContext);
    const {userList, setUserList} = useContext(AllUsersContext);
    const {userListByUser, setUserListByUser} = useContext(AllUsersContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoginFeedback("Loading...");
        setLoggedInUser("");
        fetchUsers().then(({users}) => {
            setLoginFeedback("");
            setUserList(users);
            users.map((user) => {
                setUserListByUser((origUsers) => {
                    const newUsers = {...origUsers};
                    const newUser = {name: user.name, avatar_url: user.avatar_url};
                    newUsers[user.username] = newUser;
                    return newUsers;
                });
            });
        })
    }, [])

    const handleLogin = (user) => {
        setLoggedInUser(user);
        if (location.pathname === '/login'){
            navigate('/');
        }
    }

    return (
        <>
            <h2>Login</h2>
            <p>You must select your user account in order to access the Northcoders News forum.</p>
            <p className="login-message">{loginFeedback}</p>
            <ul className='login-list'>
            {userList.map((user) => (
                <li onClick={() => {handleLogin(user)}} className='login-user-item clickable' key={user.username} title={"Login as "+user.name}>
                    <LoginUserCard user={user} />
                </li>
            ))}
            </ul>       
        </>
    )

}

export default Login;