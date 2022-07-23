import axios from "axios";
import React, { useState, useEffect } from "react";

const Account = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("http://dct-user-auth.herokuapp.com/users/account", {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                setUser(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h2>Account Details</h2>
            <p>Username - {user.username}</p>
            <p>Email - {user.email}</p>
        </div>
    )
}

export default Account