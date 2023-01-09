import { getAuth, onAuthStateChanged } from "firebase/auth";

import userStateAndFunctions from "./userStateAndFunctions.js";
import listenToUserCloseBrowserTab from "./listenToUserCloseBrowserTab.js";

function checkAuthorisationStateChange() {
  const { setUser, removeUser } = userStateAndFunctions;

  onAuthStateChanged(getAuth(), (user) => {
    user ? setUser(user) : removeUser();
  });

  listenToUserCloseBrowserTab();
}

export default checkAuthorisationStateChange;