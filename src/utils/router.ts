import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'
import * as pathToRegexp from 'path-to-regexp'

export const createRouter = (service: OSService) => async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const calledPath = event.path
  let keys: pathToRegexp.Key[] = []
  let validatedPathResult: string[] = []
  let resolvedPathKeys: pathToRegexp.Key[] = []
  let resolvedRoute: OSRoute | undefined

  service.routes.every((route) => {

    const matchMethod = route.method + '' === event.httpMethod.toUpperCase() || route.method === 'ANY'
    if (!matchMethod) {
      return true // true continues to the next iteration
    }

    const hasBasePathPath = process.env.IS_REMOTE === 'true'
    keys = []
    const exactPath = `${hasBasePathPath ? `/${service.baseMapBasePath ||  ''}` : ''}/${service.basePath}${route.path === '' ? '' : '/'}${route.path}`
    if (calledPath === exactPath) {
      resolvedRoute = route
      return false // we found the best match possible
    }
    const pathToTest: RegExp = pathToRegexp(exactPath, keys)
    const pathTestResult = pathToTest.exec(calledPath)
    if (pathTestResult && pathTestResult.length > 0) {
      validatedPathResult = pathTestResult
    }
    if (!!pathTestResult) {
      resolvedRoute = route
      resolvedPathKeys = keys
    }
    return true // continue to the next iteration since we can find a better match
  })

  // check if path was resolved
  if (!resolvedRoute) {
    cb(undefined, { body: 'Route Not Found', statusCode: 400 })
  } else {
    let validatedParams
    if (resolvedPathKeys.length > 0 && validatedPathResult.length > resolvedPathKeys.length) {
      const params: any = {}
      resolvedPathKeys.map((item, index) => {
        params[item.name] = validatedPathResult[index + 1]
      })
      validatedParams = params
    }
    const newEvent = {
      ...event,
      pathParameters: validatedParams,
    }
    await resolvedRoute.handler(newEvent, context, cb)
  }
}

export interface OSRoute {
  path: string
  method: Method
  handler: Handler
}

export interface OSService {
  basePath: string
  baseMapBasePath?: string
  routes: OSRoute[]
}

export enum Method {
  POST = 'POST',
  GET = 'GET',
  ANY = 'ANY',
}
