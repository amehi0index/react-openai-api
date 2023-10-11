import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Alert from './components/Alert'
import CardList from './components/CardList'

const App = () => {

  const [ingredientInput, setIngredientInput] = useState("")
  const [results, setResults] = useLocalStorage("results", [])
  const [showAlert, setShowAlert] = useState(false)

  const [consent, setConsent] = useState(false)
  const [dbInput, setDbInput] = useState([])

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

    console.log('I submit')

    let strToArray = []
    strToArray = ingredientInput.split(",")

    if(strToArray.length < 3 || strToArray.length > 5 ){
      console.log("Please enter 3")
      setShowAlert(true)
    }else{ 

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ ingredient: ingredientInput }),
      })

      const data = await response.json()
      setIngredientInput("")
      setResults([...results, { ingredientPrompt: capitilizeInput(ingredientInput), nameResult: data.result }])

      //if consent
      setDbInput([...dbInput, {ingredients: ingredientInput, suggestedNames: data.result}])
    }


    //POST dbInput to DB

  }

  const clearAll = () => {
    localStorage.removeItem('results')
    setResults([])
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

        <Alert showAlert={showAlert} setShowAlert={setShowAlert} /> 
        <CardList results={results} setConsent={setConsent} />
    
      </main>
      {results.length > 0 &&  <button className="clear-btn" onClick={clearAll}>Clear All</button>}
    </div>
  )
}

export default App;

