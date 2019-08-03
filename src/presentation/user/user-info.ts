import {userInfoUC} from '../../core/use-cases/user/userInfoUC'


export async function getUserInfoHandler(req, res) {
  try {
    console.log(req.username)
    const userInfo = await userInfoUC(req.username)
    return res.status(200).send({
      data: userInfo,
      message: 'User info successfully retrieved'
    })

  } catch (e) {
    return res.status(400).send({
      err: e.message,
      message: "User info retrieving failed"
    })
  }
}