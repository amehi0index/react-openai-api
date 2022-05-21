const express = require('express')
const router = express.Router()
const axios = require('axios');
const { OpenAIApi, Configuration }  = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.get('/', async (req, res) => { 
    res.send("We are on Home")
})

router.post('/', async (req, res) => { 

    const { ingredient } = req.body
    const completion = await openai.createCompletion("text-davinci-002", {
        prompt: `Suggest two names for a hot sauce based on three main ingredients.

        Ingredients: Beets, Blueberries, Ghost Peppers
        Names: Purple Blaze, Purple Inferno
        Ingredients: Avocado, Jalapeno, Scallion
        Names: Hottee Aguacattee, Green Dragon's Flame
        Ingredients: Pineapple, Scotch Bonnet Peppers, Maui Onions
        Names: Helio's Sweet Heat, Island Flame
        Ingredients: Chocolate Habanero Peppers, Black Garlic, Coffee
        Names: Nocturne Fire, Hades Revenge
        Ingredients: Scotch Bonnet Peppers, Carrot, Habanero
        Names: Sunrise Heat, Sunrise Flames
        Ingredients: ${ingredient}
        Names:`,
        temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });   
})

module.exports = router