import React, { useState } from "react";
import validator from "validator"
import axios from "axios";

const Register = (props) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formErrors, setformErrors] = useState({})
    const errors = {} // validation purpose

    const runValidations = () => {
        // name
        if (userName.trim().length === 0) {
            errors.userName = "Name can't be blank"
        }

        //email
        if (email.trim().length === 0) {
            errors.email = "Email can't be blank"
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid Email format"
        }

        //password
        if (password.trim().length === 0) {
            errors.password = "Password can't be blank"
        } else if (password.trim().length < 8) {
            errors.password = "Password must contain minimum of 8 Characters"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                username: userName,
                email: email,
                password: password
            }
            // console.log(formData)

            axios.post("http://dct-user-auth.herokuapp.com/users/register", formData)
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty("errors")) {
                        /* "errors"(ref. line no.50&51) - postman app error property , 
                        not the validation error object (ref. line no.10) */
                        console.log(result.errors)
                    } else {
                        alert("successfully created the user")
                        props.history.push("/login")

                        setUserName("")
                        setEmail("")
                        setPassword("")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            console.log("errors", errors) // talking about form errors
            setformErrors(errors)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "userName") {
            setUserName(e.target.value)
        } else if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <h2>Register With Us</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={handleChange}
                    name="userName"
                /> {formErrors.userName && <span>{formErrors.userName}</span>} <br />

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

export default Register