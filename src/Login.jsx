import React, { useState, useEffect } from 'react'
import App from './App'
import "./App.css"
import axios from 'axios'

function Login() {
    const [auth, setAuth] = useState(localStorage.getItem("auth") || "")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = () => {
        axios.post("http://localhost:9999/auth/login", { username, password })
            .then(res => {
                localStorage.setItem("auth", res.data)
                setAuth(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    return auth ? <App /> : <div className="App">
        <header className="App-header">
            <h1>Login</h1>
            <form>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                <br />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <br /><br />
                <button type="button" onClick={login}>Login</button>
            </form>
        </header>
    </div>
}

export default Login