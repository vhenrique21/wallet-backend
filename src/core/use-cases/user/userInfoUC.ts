import { getUserByUsername } from '../../data-sources/user';

export const userInfoUC = async (username: string) => {

    return await getUserByUsername(username)
  }
  