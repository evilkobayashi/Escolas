import express, { type Express } from 'express'
import { UserRoutes } from './http/routes';

const app: Express = express();

app.use('/api', UserRoutes)

export { app as AppServer }