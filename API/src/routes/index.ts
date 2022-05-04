import { Router } from 'express'
import * as auth from './auth'
import * as user from './user'

const routes = Router()

routes.use('/auth', auth.default)
routes.use('/users', user.default)

export default routes

