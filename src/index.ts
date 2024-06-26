import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './utils/errorHandler/errorHandler'

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ "msg": "Wellcome to HEXAGON ALPHA VERSION" })
})
app.use('/static', express.static('assets'))
app.use(routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(`keep your calm, do your best on: http://localhost:${port}`)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
})
