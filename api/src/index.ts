import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import morgan from 'morgan'
import cors from 'cors'
import { SERVER } from './lib/env'
import logger from './lib/logger'
import { RouteConfig } from './lib/route.config'
import { errorHandler } from './middleware'
import { Database } from './database'
import { UserRoute } from './routes/user.route'
import { SessionRoute } from './routes/session.route'

const routes: Array<RouteConfig> = []


// express configuration
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())
app.use(morgan('combined', {
	stream: {
		write: (message: string) => {
			logger.info(message.trim());
		},
	}
}))


// routes configuration
routes.push(new SessionRoute(app))
routes.push(new UserRoute(app))


app.use(errorHandler)




// server configuration
const server = createServer(app)


const SERVER_CALLBACK = () => {
	logger.info(`server started `)
	logger.debug(`listening on ${SERVER.HOST}:${SERVER.PORT}`)

	routes.forEach(route => logger.info(`Route configured: ${route.name}`))
}

const SERVER_ERROR = (err: any) => {
	if (err.code === 'EADDRINUSE') {
		logger.info('Address in use, retrying...')
		setTimeout(() => {
			server.close()
			SERVER.PORT++
			server.listen(SERVER.PORT, SERVER.HOST)
		}, 1000)
	}
}



// database configuration
Database.initialize()
	.then(() => {
		logger.info('database connected')

		server
			.listen(SERVER.PORT, SERVER.HOST, SERVER_CALLBACK)
			.on('error', SERVER_ERROR)
	})
	.catch(err => {
		logger.error(err.toString())
		logger.error('database connection failed')
	})
