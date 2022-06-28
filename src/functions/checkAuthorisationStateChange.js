import { getAuth, onAuthStateChanged } from "firebase/auth";

import userStateAndFunctions from "./userStateAndFunctions.js";

function checkAuthorisationStateChange() {
  const { setUser, removeUser } = userStateAndFunctions;

  onAuthStateChanged(getAuth(), (user) => {
    user ? setUser(user) : removeUser();
  });
}

export default checkAuthorisationStateChange;
