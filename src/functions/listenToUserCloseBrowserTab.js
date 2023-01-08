import userStateAndFunctions from "./userStateAndFunctions.js";
import useUsersOnlineListStateAndFunctions from "./useUsersOnlineListStateAndFunctions";
import loginFunctions from "./loginFunctions";

const { removeUser } = userStateAndFunctions;
const { setUserStatusOnline } = useUsersOnlineListStateAndFunctions();
const { signOutUserFromFirebase } = loginFunctions;

function listenToUserCloseBrowserTab() {
  window.addEventListener("beforeunload", (event) => {
    removeUser();
  });
}

export default listenToUserCloseBrowserTab;
