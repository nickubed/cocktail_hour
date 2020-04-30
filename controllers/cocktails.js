require('dotenv').config()
let async = require('async')
let axios = require('axios')
let express = require('express')
let db = require('../models')
let router = express.Router()
let url = `https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/`

router.get('/', (req, res) => {
    let bigList = []
    let lilList = []
    // Grab user input, format as a comma separated list, format that into a / seperated list and append it to the end of the API call
    db.ingredient.findAll()
    .then(ingredients => {
        // populate a list of all cocktails that feature one of our ingredients
        async.forEach(ingredients, (i, done) => {
            axios.get(url + `filter.php?i=${i.name}`)
            .then(response => {
                bigList.push(response.data.drinks)
                done()
            })
            .catch(err => {
                console.log(err)
                res.send('error')
            })
        })
        .then(() => {
            res.send(bigList)
        })
        .catch(err => {
            console.log(err)
            res.send('error')
        })
    })
})

router.get('/test', (req, res) => {
    db.ingredient.findAll()
    .then(ingredients => {
        listIngredients = req.body.
        axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=${listIngredients}`)
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            res.send('error')
        })
    })
})

module.exports = router