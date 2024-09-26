const express = require('express')
const router = express.Router()

const {
    getMain,
    postUrl,
    getUrl
} = require('../controllers/data-controllers')

router.get('/', getMain)

router.post('/shorten', postUrl)

router.get('/:shortcode', getUrl)

module.exports = router