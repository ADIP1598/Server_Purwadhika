const express = require('express')
const { userControllers } = require('../controllers')
const { auth } = require('../helper/authToken')
const routers = express.Router()

routers.get('/get', userControllers.getData)
routers.post('/login', userControllers.getData)
routers.post('/register', userControllers.register)
routers.patch('/verification', auth, userControllers.verification)

module.exports = routers