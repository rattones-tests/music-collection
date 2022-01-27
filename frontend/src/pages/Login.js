import React from "react"
import styled from "styled-components"

function Login() {

  const FormContent= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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

  return (
    <>
      <FormContent>
        <h1>Music Collection</h1>
        <div class="center">
          <h2>Login</h2>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <div class="actions">
            <a href="/newuser">Create new user</a>
            <button type="button">Enter</button>
          </div>
        </div>
      </FormContent>
    </>
  )
}

export default Login