import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import router from './routes'
import createConnection from './database'
import MiddlewareException from '../src/errors/MiddlewareException'

createConnection()
const app = express()

app.use(express.json())
app.use(router)
app.use(MiddlewareException)

export { app }
