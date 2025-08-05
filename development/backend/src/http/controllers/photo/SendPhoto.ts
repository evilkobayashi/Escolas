import { Request, Response } from 'express'

export function SendPhotoController(req: Request, res: Response) {
    try {
        
        
        res
            .status(200)
            .json({
                status: 200,
                message: "Photo received!"
            })
        
    } catch(err) {
        res
            .status(400)
            .json({
                status: 400,
                message: "Error on send!"
            })
    }
}