require('dotenv').config()
let async = require('async')
let axios = require('axios')
let db = require('./models')
let ejsLayouts = require('express-ejs-layouts')
let express = require('express')
let method = require('method-override')

let app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(method('_method'))

app.use('/ingredients', require('./controllers/ingredients'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/search', (req, res) => {
    let query = req.query.ingredient
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`)
    .then(response => {
        cocktailList = response.data.drinks
        res.render('cocktails/list', { list: cocktailList, query })
    })
    .catch(err => {
        console.log(err)
        res.send('error')
    })
})

app.get('/:id', (req, res) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(response => {
        details = response.data.drinks[0]
        res.render('cocktails/show', details)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`You are listening to the sweet sounds of port ${process.env.PORT}`)
})