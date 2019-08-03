import {GetInvestment} from '../../core/use-cases/bank/getInvestments'

export const getInvestmentHandler = async (req, res) => {
  try {
    const infoAccount = await GetInvestment(req.username)
    return res.status(200).send({
      data: infoAccount,
      message: 'Success'
    })
  } catch (e) {
    return res.status(500).send(e.message)
  }

}