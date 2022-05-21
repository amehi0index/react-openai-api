import React from 'react'
import Card from './Card'
import { v4 as uuidv4 } from 'uuid'

const CardList = ({ savedResults }) => {

  const reverseArray = (array) => {
    let output = []
    array.map((value) => output.unshift(value))
    return output
  }

  const reversedResults = reverseArray(savedResults)

  return (
    <div className="card-list">
      {reversedResults && reversedResults.map(r => (
        <Card key={uuidv4()} prompt={r.ingredientPrompt} response={r.nameResult}/>
      ))}
    </div>
  )
}

export default CardList