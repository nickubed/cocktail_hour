let async = require('async')
let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.ingredient.findAll()
    .then(ingredients => {
        res.render('ingredients/list', { ingredients })
    })
    .catch(err => {
        console.log(err)
        res.send('error!')
    })
})

router.post('/', (req, res) => {
    let ing = req.body
    if(ing){
        db.ingredient.create(ing)
        .then(ingredientCreated => {
            res.redirect('/ingredients')
        })
        .catch(err => {
            console.log(err)
            res.send('error!')
        })
    }
})

router.delete('/:id', (req, res) => {
    db.ingredient.destroy({
        where: {id : req.params.id}
    })
    .then(deleted => {
        res.redirect('/ingredients')
    })
})

module.exports = router