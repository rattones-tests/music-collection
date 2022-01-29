import React, { useState, useEffect } from "react"
import axios from "axios"

import styled from "styled-components"

function Album() {

  const [ artistList, setArtistList ]= useState([])

  useEffect(()=> {
    axios.get('https://moat.ai/api/task', {
      headers: {
        Authorization: false,
        Basic: 'ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ=='
      }
    }).then((response)=> {
      console.dir(response)
    }).catch((error)=> {
      console.dir(error)
    })
  }, [])

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

  return (
    <>
      <FormNewUser>
        <h1>Music Collection</h1>
        <form>
          <h2>Album</h2>

          <label>Artist</label>
          <select name="artist">
            <option></option>
            <option>Metallica</option>
            <option>Ramones</option>
            <option>Mega Death</option>
            <option>Motorhead</option>
          </select>
          <label>Album name</label>
          <input type="text" name="albumname" />
          <label>Year</label>
          <input type="number" name="year" />
          <div class="actions">
            <a href="/dashboard">Back</a>
            <button type="button">Save</button>
          </div>
          </form>
      </FormNewUser>
    </>
  )
}

export default Album
