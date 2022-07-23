import React from "react";
import { Link, Route, withRouter } from "react-router-dom"
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account"
import MyNotes from "./MyNotes";

const NavBar = (props) => {
    const { userLoggedIn, handleAuth } = props
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                {
                    userLoggedIn ? (
                        <>
                            <li><Link to="/account">Account</Link></li>
                            <li><Link to="/mynotes">My Notes</Link></li>
                            <li><Link onClick={() => {
                                localStorage.removeItem("token")
                                alert("Successfully logged out")
                                handleAuth()
                                props.history.push("/")
                            }}>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )
                }
            </ul>

            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/login"
                render={(props) => {
                    return <Login {...props}
                        handleAuth={handleAuth} />
                }} />
            <Route path="/account" component={Account} />
            <Route path="/mynotes" component={MyNotes} />
        </div>
    )
}

export default withRouter(NavBar)