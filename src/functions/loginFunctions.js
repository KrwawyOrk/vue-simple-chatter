import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";

import userStateAndFunctions from "./userStateAndFunctions.js";
import useErrorMessages from "./useErrorMessages.js";

const { setLoggingInProgress } = userStateAndFunctions;
const { setloginErrorMessage, clearLoginErrorMessage, getLoginErrorMessage } =
  useErrorMessages();

function signOutUserFromFirebase() {
  const auth = getAuth();
  auth.signOut();
}

function loginWithUserEmailAndPassword(email, password) {
  setLoggingInProgress(true);

  if (getLoginErrorMessage) {
    clearLoginErrorMessage();
  }

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setLoggingInProgress(false);

      const user = userCredential.user;
      console.log("Logged successfull!!");
      console.log(
        `Logged user in: ${user.email},${user.emailVerified}, ${user.isAnonymous}`
      );
      console.log("User ID: " + user.uid);
    })
    .catch((error) => {
      setLoggingInProgress(false);

      const errorMessage = error.message;
      setloginErrorMessage(errorMessage);
    });
}

function anonymousLogin() {
  setLoggingInProgress(true);

  if (getLoginErrorMessage) {
    clearLoginErrorMessage();
  }

  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      setLoggingInProgress(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      setloginErrorMessage(errorMessage);
    });
}

const loginFunctions = {
  signOutUserFromFirebase,
  loginWithUserEmailAndPassword,
  anonymousLogin,
};

export default loginFunctions;
