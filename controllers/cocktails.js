let async = require('async')
let axios = require('axios')
let express = require('express')
let db = require('../models')
let router = express.Router()
let url = `https://www.thecocktaildb.com/api/json/v1/1/`

//flatten function taken from user Noah Freitas on Stack Overflow
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

router.get('/', (req, res) => {
    let bigList = []
    let lilList = []
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

module.exports = router