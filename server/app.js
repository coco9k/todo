require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333
const listsRoute = require('./routes/lists.routes')

app.use(cors())

app.use(express.json())

app.use('/todo', listsRoute)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})