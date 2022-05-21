import React from 'react'

const Card = ({ prompt, response }) => {
  return (
    <div className="card">
      <div className="prompt">
        <h3>Primary Ingredients: <span>{prompt}</span></h3>
      </div>
      <div className="response">
        <h3>Fancy Hot Sauce Name:<span>{response}</span></h3>
      </div>
    </div>
  )
}

export default Card