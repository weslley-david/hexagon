import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './utils/errorHandler/errorHandler'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "working": "good" })
})

console.log(__dirname)

app.use('/static', express.static('assets'))

app.use(routes)

// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`༼ つ ╹ ╹ ༽つ http://localhost:${port}`)
})
