import {APIGatewayEvent, Callback, Context} from 'aws-lambda'


export async function helloWorldHandler(event: APIGatewayEvent, _context: Context, _callback: Callback) {
  console.log(event)
  _callback( undefined,{
    responseCode: 200,
    body: JSON.stringify({
      message: "Hello World. This is the first handler of wALLet"
    })
  })
}