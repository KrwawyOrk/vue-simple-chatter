import { reactive, computed } from "vue";
import useUsersOnlineListStateAndFunctions from "./useUsersOnlineListStateAndFunctions.js";

const state = reactive({
  id: "",
  name: "",
  email: "",
  isUserLoggedIn: false,
  isUserAnonymous: false,
  isLoggingInProgress: false,
  isAccountCreationInProgress: false,
});

const getUserId = computed(() => state.id);
const getUserName = computed(() => state.name);
const getUserEmail = computed(() => state.email);
const isUserLoggedIn = computed(() => state.isUserLoggedIn);
const isUserAnonymous = computed(() => state.isUserAnonymous);
const isLoggingInProgress = computed(() => state.isLoggingInProgress);
const isAccountCreationInProgress = computed(
  () => state.isAccountCreationInProgress
);

function setUser(firebaseAuthUser) {
  const { uid, displayName, email, isAnonymous } = firebaseAuthUser;
  const { setUserStatusOnline } = useUsersOnlineListStateAndFunctions();

  state.id = uid;
  state.name = displayName;

  isAnonymous
    ? (state.email = createUserNameForAnonymousLogin())
    : (state.email = email);

  (state.chatRoomName = "chats"), (state.isUserLoggedIn = true);
  state.isUserAnonymous = isAnonymous;

  setUserStatusOnline(true);
}

function removeUser() {
  const { setUserStatusOnline } = useUsersOnlineListStateAndFunctions();

  if (isUserLoggedIn.value === true) {
    setUserStatusOnline(false);

    state.id = "";
    state.name = "";
    state.email = "";
    (state.chatRoomName = ""), (state.isUserLoggedIn = false);
    state.isAccountCreationInProgress = false;
  }
}

function setLoggingInProgress(isLogging) {
  state.isLoggingInProgress = isLogging;
}

function setAccountCreationInProgress(isCreatingAccount) {
  state.isAccountCreationInProgress = isCreatingAccount;
}

function createUserNameForAnonymousLogin() {
  const name = `Gosc_${state.id.substring(0, 5)}`;
  return name;
}

const userStateAndFunctions = {
  getUserId,
  getUserName,
  getUserEmail,
  isUserLoggedIn,
  isUserAnonymous,
  isLoggingInProgress,
  isAccountCreationInProgress,
  setUser,
  removeUser,
  setLoggingInProgress,
  setAccountCreationInProgress,
};

export default userStateAndFunctions;
