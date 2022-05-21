import {  useEffect, useState } from 'react'
import CardList from './components/CardList'

const App = () => {

  const [ingredientInput, setIngredientInput] = useState("")
  const [results, setResults] = useState([])
  const [savedResults, setSavedResults] = useState([])

  useEffect(() => {
    if(results.length > 0){
      localStorage.setItem('results', JSON.stringify(results))
    }
    
    let retrievedArray
  
    if(localStorage.getItem('results') === null){
       retrievedArray = []
    }else{
      retrievedArray = JSON.parse(localStorage.getItem('results')) 
    }
      
    setSavedResults(retrievedArray)
  
  }, [results])

  const capitilizeInput = (string) => {
    const strToArray = string.split(",").map(item => item.trim())
    const capitalizedFirstLetters = strToArray.map(el => {
      return el.charAt(0).toUpperCase() + el.slice(1)
    })
    const newString = capitalizedFirstLetters.join(", ")       
    return newString
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient: ingredientInput }),
    })

    const data = await response.json()
    setIngredientInput("")

    const nameResults = {
      ingredientPrompt: capitilizeInput(ingredientInput),
      nameResult: data.result
    }
    setResults(prev => [...prev, nameResults])
  }

  const clearAll = () => {
    localStorage.removeItem('results')
    setSavedResults([])
  }

  return (
    <div className="container">
      <header className="header">
        <h2>Hot Sauce Name Maker</h2>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            id="ingredient"
            type="text"
            name="ingredient"
            placeholder="Enter Three Main Ingredients: e.g. Ghost Peppers, Blueberries, Garlic"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn"><i className="fa-solid fa-fire"></i></button>
        </form>
        <CardList savedResults={savedResults} />
    
      </main>
      {savedResults.length > 0 &&  <button className="clear-btn" onClick={clearAll}>Clear All</button>}
    </div>
  )
}

export default App;
