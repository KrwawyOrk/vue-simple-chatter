import loginFunctions from "./loginFunctions";

const { signOutUserFromFirebase } = loginFunctions;

function listenToUserCloseBrowserTab() {
  window.addEventListener("beforeunload", (event) => {
    signOutUserFromFirebase();
  });
}

export default listenToUserCloseBrowserTab;
