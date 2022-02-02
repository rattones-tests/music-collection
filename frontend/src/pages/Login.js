import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import Api from '../services/Api'

import styled from "styled-components"

const Login= ()=> {

  const [ username, setUsername ]= useState('')
  const [ password, setPassword ]= useState('')

  const navigate= useNavigate()

  useEffect((navigate)=> {
    const token= localStorage.getItem('token')

    if (token === null) {
      return false
    }

    Api.post('/validation', {
      token
    }).then(response=> {
      navigate('/dashboard')
    }).catch(error=> {
      // console.dir(error)
    })
  }, [])

  const handleSubmit= (event)=> {
    event.preventDefault()

    Api.post('/login', {
      username, password
    }).then(response=> {
      if (response.status === 200) {
        let token= {
          v4: response.data.id,
          time: Math.floor(Date.now() / 1000)
        }
        token= btoa(JSON.stringify(token))
        localStorage.setItem('token', token)

        navigate('/dashboard')
      }
    }).catch(error=> {
      if (error.response.status === 401) {
        alert('Invalid username and password')
      }
    })
  }

  return (
    <>
      <FormContent>
        <h1>Music Collection</h1>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={event=> setUsername(event.target.value)} />
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={event=> setPassword(event.target.value)} />
          <div className="actions">
            <Link className="" to="/newuser">Create new user</Link>
            <button type="submit">Enter</button>
          </div>
        </form>
      </FormContent>
    </>
  )
}

const FormContent= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 30%;
    padding: 5%;
    background-color: #eef;
    border: 1px solid #999;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .center {
    width: 30%;
    padding: 5%;
    background-color: #eef;
    border: 1px solid #999;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  label {
    margin-top: 5px;
  }

  button {
    margin-top: 5px;
    padding: 0 15px 0 15px;
  }

  a {
    margin-top: 5px;
    text-decoration: none;
    font-size: 0.8rem;
    color: #66a;
    &:hover {
      color: #339;
    }
  }
`

export default Login
