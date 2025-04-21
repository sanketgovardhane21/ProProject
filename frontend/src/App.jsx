import React, { useState } from 'react'

const App = () => {
  const [email, setEmail] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [protectedData, setProtectedData] = useState("")

  const register = () => {
    axios.post("http://localhost:5000/api/auth/register", {email, username ,password})
    .then(res => alert("User Registered"))
    .catch(err => alert("Error Registering"))
  }
  const login = () => {
    axios.post("http://localhost:5000/api/auth/login",{email, password})
    .then(res => setToken(res.data.token))
    .catch(err => alert("Login Failed"))
  }
  const getProtected = () => {
    axios.get("http://localhost:5000/api/auth/protected",{headers:{Authorization: token}})
    .then(res => setProtectedData(res.data.message))
    .catch(err => alert("Access Denied"))
  }

  return (
    <div style={{padding: 20}}>
      <h2>MERN AUTH</h2>
      <input placeholder='Username' onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder='Email' onChange={e => setUserName(e.target.value)} />
      <br />
      <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={getProtected}>Get Protected Data</button>
      <p>{protectedData}</p>
      
    </div>
  )
}

export default App
