import { AppState } from "../data/app";
import { UserDatabase } from "../data/user";

export const getIsLoggedIn = () => {
  const username = AppState.currentUserId;

  if (!username) return false;

  const userInfo = UserDatabase.findUserByName(username);

  return !!userInfo;
};
