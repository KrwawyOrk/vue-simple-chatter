import { getAuth, onAuthStateChanged } from "firebase/auth";

import userStateAndFunctions from "./userStateAndFunctions.js";
import loginFunctions from "./loginFunctions.js";
import useUsersOnlineListStateAndFunctions from "./useUsersOnlineListStateAndFunctions.js";

function checkAuthorisationStateChange() {
  const { setUser, removeUser } = userStateAndFunctions;
  const { signOutUserFromFirebase } = loginFunctions;
  const { setUserStatusOnline } = useUsersOnlineListStateAndFunctions();

  onAuthStateChanged(getAuth(), (user) => {
    user ? setUser(user) : removeUser();
  });

  window.addEventListener("beforeunload", (event) => {
    setUserStatusOnline(false);
    signOutUserFromFirebase();
  });
}

export default checkAuthorisationStateChange;