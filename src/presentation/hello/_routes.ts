import {createRouter, Method, OSService} from '../../utils/router'
import {helloWorldHandler} from './hello-world'


const helloApi: OSService = {
  basePath: 'hello',
  routes: [
    {
      path: '',
      method: Method.GET,
      handler: helloWorldHandler,
    }
  ],
}

export const handler = createRouter(helloApi)
