import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import Api from '../services/Api'

const User= ()=> {

  const [ fullname, setFullname ]= useState('')
  const [ username, setUsername ]= useState('')
  const [ password, setPassword ]= useState('')
  const [ confirm, setConfirm ]= useState('')
  const [ role, setRole ]= useState('user')
  const [ userId, setUserId]= useState('')

  const navigate= useNavigate()
  const { uuid }= useParams()

  useEffect(()=> {
    const token= localStorage.getItem('token')

    if (token === null) {
      return false
    }

    Api.post('/validation', {
      token
    }).then(response=> {
      if (uuid !== undefined) {
        Api.get(`/users/${uuid}`
        ).then(response=> {
          console.dir(response)
          setUserId(response.data[0].id)
          setFullname(response.data[0].fullname)
          setUsername(response.data[0].username)
          setRole(response.data[0].role)
        })
      } else {
        setUserId(response.data[0].id)
        setFullname(response.data[0].fullname)
        setUsername(response.data[0].username)
        setRole(response.data[0].role)
      }
      document.querySelector('#username').readOnly= true

      if (response.data[0].role === 'admin') {
        document.querySelector('.checkbox').style.display= 'block'
        document.querySelector('#role').checked= (role === 'admin')? true: false
        document.querySelector('#delete').style.display= 'block'
      }
    }).catch(error=> {
      console.dir(error)
      // localStorage.clear()
    })
  }, [])

  const handleSubmit= async (event)=> {
    event.preventDefault()

    if (fullname === '') {
      alert("Fullname is required")
      return false
    }

    if (username === '') {
      alert("Username is required")
      return false
    }

    if (password === '' || confirm === '') {
      alert("Password and confirmation password are required")
      return false
    }

    if (password !== confirm) {
      console.dir([password, confirm])
      alert("Password confirmation does not match")
      return false
    }

    let userEndPoint= (uuid === undefined)? '/users': `/users/${uuid}`

    Api.post(userEndPoint, {
      fullname, username, password, role
    }).then(response=> {
      switch (response.status) {
        case 201:
          alert('User created')
          break
        case 200:
          alert('User updated')
          break
        default:
          break
      }
    }).catch(error=> {
      // console.dir(error)
      if (error.response.status === 409) {
        alert(error.response.data)
      }
    })


  }

  const handleDelete= ()=> {
    Api.delete(`/users/${userId}`
    ).then(()=> {
      if (uuid === undefined) {
        localStorage.clear()
        navigate('/')
      } else {
        navigate('/dashboar')
      }
    })
  }

  const handleSetRole= (status)=> {
    setRole((status)? 'admin': 'user')
  }

  return (
    <>
      <FormNewUser>
        <h1>Music Collection</h1>
        <form onSubmit={handleSubmit}>
          <h2>User {fullname}</h2>

          <label>Full name</label>
          <input type="text" name="fullname"
            value={fullname}
            onChange={event=> setFullname(event.target.value)}
          />
          <label>Username</label>
          <input type="text" name="username" id="username"
            value={username}
            onChange={event=> setUsername(event.target.value)}
          />
          <label>Password</label>
          <input type="password" name="password"
            value={password}
            onChange={event=> setPassword(event.target.value)}
          />
          <label>Confirm password</label>
          <input type="password" name="confirmpass"
            value={confirm}
            onChange={event=> setConfirm(event.target.value)}
          />
          <div className="checkbox">
            <input type="checkbox" name="role" id="role"
              value={role}
              onChange={event=> handleSetRole(event.target.checked)}
            />
            <label>User admin</label>
          </div>

          <div className="actions">
            <Link to="/">Back</Link>
            <button id="delete" type="button" onClick={handleDelete}>Delete</button>
            <button type="submit">Save</button>
          </div>
          </form>
      </FormNewUser>
    </>
  )
}


const FormNewUser= styled.div`
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

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  label {
    margin-top: 5px;
  }

  .checkbox {
    margin-top: 5px;
    display: none;
  }

  #delete {
    display: none;
    background: #f99;
  }

  button {
    cursor: pointer;
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

export default User
