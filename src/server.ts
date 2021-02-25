import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import router from './routes'
import './database'
import MiddlewareException from '../src/errors/MiddlewareException'

const app = express()

app.use(express.json())
app.use(router)
app.use(MiddlewareException)

app.listen(3333, () => console.log('Server is running on port 3333.'))
