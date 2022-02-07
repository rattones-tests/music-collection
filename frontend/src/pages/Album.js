import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
// import axios from "axios"

import Api from '../services/Api'

import styled from "styled-components"

import artists from '../assets/artists.json'


const Album= ()=> {

  const [ artistList, setArtistList ]= useState([])
  const [ artistId, setArtistId ]= useState('')
  const [ albumName, setAlbumName ]= useState('')
  const [ year, setYear ]= useState(0)
  const [ userId, setUserId ]= useState('')

  const { id }= useParams()
  const navigate= useNavigate()
  const token= localStorage.getItem('token')

  useEffect(()=> {

    if (token === null) {
      return false
    }

    Api.post('/validation', {
      token
    }).then(response=> {
      setUserId(response.data[0].id)
      setArtistList(artists)
      if (response.data[0].role === 'admin') {
        document.querySelector('#delete').style.display= 'block'
      }
    }).catch(error=> {
      localStorage.clear()
      navigate('/')
    })

    if (id !== undefined) {
      Api.get(`/album/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response=> {
        // console.dir(response)
        setArtistId(response.data[0].artist_id)
        setAlbumName(response.data[0].name)
        setYear(response.data[0].year)
      }).catch(error=> {
        // console.dir(error)
      })
    }
  }, [])

  const handleSubmit= (event)=> {
    event.preventDefault()

    let saveEndPoint= (id === undefined)? '/album':  `/album/${id}`

    console.dir([artistId, albumName, year, userId])
    Api.post(saveEndPoint,     {
      name: albumName,
      year: year,
      artist_id: artistId,
      user_id: userId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response=> {
      console.dir(response)
      let msg= ''
      switch (response.status) {
        case 200:
          msg= 'Album updated'
          break;
        case 201:
          msg= 'Album created'
          break;
        default:
          msg= ''
          break;
      }
      if  (msg !== '') {
        alert(msg)
      }
    }).catch(error=> {
      console.dir(error)
    })
    // navigate("/dashboard")
  }

  const handleDelete= ()=> {
    if (id === '') {
      return false
    }

    Api.delete(`/album/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    ).then(response=> {
      alert('Album deleted')
      navigate('/dashboard')
    }).catch(error=> {
      console.dir(error)
    })
  }

  return (
    <>
      <FormNewUser>
        <h1>Music Collection</h1>
        <form onSubmit={handleSubmit}>
          <h2>Album</h2>

          <label>Artist</label>
          <select name="artist" value={artistId} onChange={event=> setArtistId(event.target.value)}>
            <option></option>
            {artistList.map(item=> (
              <option key={item.id} id={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          <label>Album name</label>
          <input type="text" name="albumname" value={albumName} onChange={event=> setAlbumName(event.target.value)} />
          <label>Year</label>
          <input type="number" name="year" value={year} onChange={event=> setYear(event.target.value)} />
          <div className="actions">
            <Link to="/dashboard">Back to dashboard</Link>
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

  #delete {
    display: none;
    background: #f99;
  }

  button {
    margin-top: 5px;
    padding: 0 15px 0 15px;
    cursor: pointer;
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

export default Album
