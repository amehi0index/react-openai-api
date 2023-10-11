import React from 'react'

const Card = ({ prompt, response, setConsent }) => {

  const handleConsent = () => {
    console.log('I consent to be saved@')
  }

  return (
    <div className="card">
      <div className="prompt">
        <h3>Primary Ingredients: <span>{prompt}</span></h3>
      </div>
      <div className="response">
        <h3>Fancy Hot Sauce Name:<span>{response}</span></h3>
        <button onClick={()=>handleConsent}><i className="fa-solid fa-fire"></i> </button>
      </div>
    </div>
  )
}

export default Card