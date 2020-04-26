require('dotenv').config()
let axios = require('axios')
let db = require('./models')
let ejsLayouts = require('express-ejs-layouts')
let express = require('express')

let app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/list', (req, res) => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
    .then(response => {
        res.send(response.data)
    })
    .catch(err => {
        console.log(err)
        res.send('error')
    })
})

app.listen(process.env.PORT, () => {
    console.log(`You are listening to the sweet sounds of port ${process.env.PORT}`)
})