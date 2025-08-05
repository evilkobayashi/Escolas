import { Router, IRouter } from 'express'
import { SendPhotoController } from '../controllers/photo/SendPhoto'

const router: IRouter = Router()
    
router.get('/', SendPhotoController)

export { router as UserRoutes }