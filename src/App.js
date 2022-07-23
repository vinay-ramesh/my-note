import React, { useState, useEffect } from "react"
import NavBar from "./Components/NavBar"

const App = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            handleAuth()
        }
    }, [])

    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn)
    }
    return (
        <div>
            <h1>User Auth</h1>
            <NavBar
                userLoggedIn={userLoggedIn}
                handleAuth={handleAuth}
            />
        </div>
    )
}

export default App