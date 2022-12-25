import React from 'react'

const Start = (props) => {
  return (
    <div className='start'>
      <div>
        <h1>Quizzal</h1>
        <p>Some description if needed</p>
      </div>
        <button onClick={props.startquiz}>Start quiz</button>
    </div>
  )
}

export default Start