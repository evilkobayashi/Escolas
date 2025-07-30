import { UserController } from '../controllers/UserController'
import { Router, IRouter } from 'express'


const router: IRouter = Router()

router.get('/', UserController)

export { router as UserRoutes }