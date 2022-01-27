import React from "react"
import styled from "styled-components"

function NewUser() {

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
          <h2>Create New User</h2>

          <label>Full name</label>
          <input type="text" name="fullname" />
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Confirm password</label>
          <input type="password" name="confirmpass" />
          <div class="actions">
            <a href="/">Back to login</a>
            <button type="button">Save</button>
          </div>
          </form>
      </FormNewUser>
    </>
  )
}

export default NewUser