import { Response } from "express"

export function goodRequest(res: Response, data?: object | string | number | [string, any], status = 200, message = 'Request complete'): Response<any, Record<string, any>> {
	let responseObject: object = { success: true, message }

	if (data instanceof Array)
		responseObject = { ...responseObject, [data[0]]: data[1] }
	else
		responseObject = { ...responseObject, data }

	return res.status(status).json(responseObject)
}

export function noGoodRequest(res: Response, message = 'Request failed', status = 200): Response<any, Record<string, any>> {
	return res.status(status).json({ success: false, message })
}

export function badRequest(res: Response, message = 'Request failed', status = 400): Response<any, Record<string, any>> {
	return res.status(status).json({ success: false, message })
}

export function unauthorized(res: Response): Response<any, Record<string, any>> {
	return res.status(401).json({ success: false, message: 'unuthorized' })
}

export function noUserFound(res: Response): Response<any, Record<string, any>> {
	return badRequest(res, 'no user found', 200)
}
