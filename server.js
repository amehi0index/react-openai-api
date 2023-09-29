const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json({ extended: false })) 

//Set static folder
app.use(express.static('client'))

//Routes
app.use('/api/generate', require('./routes/generate'))

//SERVE STATIC ASSETS IN PRODUCTION?
if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,'client/build')))

    app.get('*', (req, res) => {  
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) 
    })
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

//Enable cors
app.use(cors())

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))