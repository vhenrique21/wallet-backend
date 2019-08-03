import {RegisterUserOrderUC} from '../../core/use-cases/bank/registerUserOrderUC'

export const registerUserOrdersHandler = async (req, res) => {
  try {
    const infoAccount = await RegisterUserOrderUC(req.bank, req.username, req.orderBody)
    return res.status(200).send({
      data: infoAccount,
      message: 'Success'
    })
  } catch (e) {
    return res.status(500).send(e.message)
  }

}