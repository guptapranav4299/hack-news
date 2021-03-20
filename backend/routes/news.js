const express = require('express')
const { time } = require('../controllers/news')
const router = express.Router()

router.get('/',time)

module.exports=router
