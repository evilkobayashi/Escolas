import http from 'node:http'
import { AppServer } from './app'

const server = http.createServer(AppServer);

const PORT: number = Number(process.env.PORT)

server.listen(Number(PORT), () => {
    console.log(`Listening at port ${PORT}`);
})