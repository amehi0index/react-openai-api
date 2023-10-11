import React from 'react'
import Card from './Card'
import { v4 as uuidv4 } from 'uuid'

const CardList = ({ results, setConsent }) => {

  const reverseArray = (array) => {
    let output = []
    array.map((value) => output.unshift(value))
    return output
  }

  const reversedResults = reverseArray(results)

  return (
    <div className="card-list">
      {reversedResults && reversedResults.map(r => (
        <Card key={uuidv4()} prompt={r.ingredientPrompt} response={r.nameResult} setConsent={setConsent}/>
      ))}
    </div>
  )
}

export default CardList