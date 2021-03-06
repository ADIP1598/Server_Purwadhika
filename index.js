const express = require('express')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const PORT = 3300
const app = express()

app.use(cors())
app.use(express.json())
app.use(bearerToken())

app.get('/', (req, res) => {
    res.status(200).send('<h4>Integrated mysql with express</h4>')
})

const { userRouters } = require('./routers')

app.use('/users', userRouters)

app.listen(PORT, () => console.log('API Running at ', PORT));