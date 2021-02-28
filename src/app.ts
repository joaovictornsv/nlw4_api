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

export { app }
