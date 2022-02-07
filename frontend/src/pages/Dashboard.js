import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom"

import Api from '../services/Api'

const Dashboard= ()=> {

  const [ usersList, setUsersList ]= useState([])
  const [ albumList, setAlbumList ]= useState([])

  const token= localStorage.getItem('token')
  const navigate= useNavigate()

  useEffect(()=> {

    if (token === null) {
      navigate('/')
      return false
    }

    Api.post('/validation', {
      token
    }).then(response=> {
      if (response.data[0].role === 'user') {
        document.querySelector('#users').style.display= 'none'
      }
    }).catch(error=> {
      console.dir(error)
      localStorage.clear()
      navigate('/')
    })

    Api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response=> {
      setUsersList(response.data)
    })

    Api.get('/album', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response=> {
      if (response.status === 204) {
        return false
      }
      setAlbumList(response.data)
    })
  }, [])

  const handleLogout= (event)=> {
    event.preventDefault()

    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <Content>
        <h1>Music Collection</h1>
        <form>
        <h2>Dashboard</h2>
          <div className="center">
            <div id="albums">
              <h3>Albums</h3>
              <ul>
                {albumList.map(item=> (
                  <li key={item.id}><Link to={`/album/${item.id}`}>{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div id="users">
              <h3>Users</h3>
              <ul>
                {usersList.map(item=> (
                  <li key={item.id}><Link to={`/user/${item.id}`}>{item.fullname}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="actions">
            <Link type="button" to="/album">New album</Link>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </Content>
    </>
  )
}


const Content= styled.div`
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    width: 75px;
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

export default Dashboard
