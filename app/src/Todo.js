import React from 'react'

function Todo(props) {
  function deleteHandler() {
    console.log('U just deleted!')
  }

  return (
    <div className="card">
      <div className="content-card">
        <div>
          <h2>{props.title}</h2>
        </div>
        <div>
          <button type="button" className="btn" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Todo
