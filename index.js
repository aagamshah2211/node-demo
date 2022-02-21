const express = require('express')
const swaggerUI = require('swagger-ui-express')
const app = express()
const morgan = require('morgan')
    // const db = require('./config/db')
const config = require('config')
require('winston-mongodb')


const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })


app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Connected to Database
require('./config/db')
const errorHandler = require('./middleware/error')


const user = require('./routes/users')
const product = require('./routes/products')
const cart = require('./routes/cart')

app.use('/api/user', user)
app.use('/api/product', product)
app.use('/api/cart', cart)

app.use(errorHandler)

const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Listening on port....');
})