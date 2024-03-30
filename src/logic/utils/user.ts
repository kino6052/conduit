import { AppState } from "../data/app";
import { UserDatabase } from "../data/user";

export const getCurrentUser = () => {
  const username = AppState.currentUserId;

  if (!username) return;

  const userInfo = UserDatabase.findUserByName(username);

  return userInfo;
};

export const getIsLoggedIn = () => {
  return !!getCurrentUser();
};
