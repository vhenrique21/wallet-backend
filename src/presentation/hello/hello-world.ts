
export function helloWorldHandler(req, res) {
  return res.status(200).send( {
      message: "Hello World. This is the first handler of wALLet"
    }
  )
}