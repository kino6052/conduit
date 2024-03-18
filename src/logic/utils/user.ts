import { UserInfoSubject } from "../common.logic";

export const getIsLoggedIn = () => {
  const userInfo = UserInfoSubject.getValue();

  return !!userInfo;
};
