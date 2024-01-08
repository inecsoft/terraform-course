import { Router } from 'express'
import messageController from '../controllers/message'

const routes = Router()

routes.post('/', (req, res, next) => {
  messageController.generateMessage(req, res, next)
})

export default routes
