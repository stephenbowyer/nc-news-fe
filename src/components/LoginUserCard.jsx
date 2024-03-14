const LoginUserCard = ({user}) => {
    return (
        <div className="login-user-outer">
            <span className="login-username">{user.username}</span>
            <img className="login-image" src={user.avatar_url}/>
        </div>
    );
}
export default LoginUserCard;