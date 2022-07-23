import React, { useState } from "react";
import validator from "validator";
import axios from "axios";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setformErrors] = useState({})
    const errors = {}

    const runValidations = () => {
        //email
        if (email.trim().length === 0) {
            errors.email = "Email can't be blank"
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid Email format"
        }
        //password
        if (password.trim().length === 0) {
            errors.password = "Password can't be blank"
        } else if (password.trim().length <= 8) {
            errors.password = "Password must contain minimum of 8 Characters"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()

        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                email: email,
                password: password
            }
            // console.log(formData)
            axios.post("http://dct-user-auth.herokuapp.com/users/login", formData)
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty("errors")) {
                        alert(result.errors)
                    } else {
                        // console.log("result", result) - basically result = token
                        alert(`Successfully logged in`)
                        localStorage.setItem("token", result.token)
                        props.history.push("/")
                        props.handleAuth()
                        setEmail("")
                        setPassword("")
                    }
                })
                .catch((err) => { // only to handle error code 400 and above
                    console.log(err.message)
                })

        } else {
            //console.log("errors", errors) // validation error message
            setformErrors(errors)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                /> {formErrors.email && <span>{formErrors.email}</span>} <br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handleChange}
                    name="password"
                /> {formErrors.password && <span>{formErrors.password}</span>} <br />

                <input type="Submit" />
            </form>
        </div>
    )
}

export default Login