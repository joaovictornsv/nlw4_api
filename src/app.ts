import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import router from './routes'
import createConnection from './database'
import MiddlewareException from '../src/errors/MiddlewareException'
import { join } from 'path'

createConnection()
const app = express()

app.use(express.json())
app.use(router)
app.use(MiddlewareException)

app.set('views', join(__dirname, 'views', 'pages'))
app.set('view engine', 'hbs')

export { app }
