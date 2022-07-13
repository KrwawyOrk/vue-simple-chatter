import { ref } from "vue";

function useMobileMenuState() {
  const MOBILEMENU_STATE = {
    MAINMENU: 0,
    PRIVATE_MESSAGES: 1,
    CHAT_ROOMS: 2,
    USERS_ONLINE: 3,
    ACCOUNT_PROFILE: 4,
    SETTINGS: 5,
  };

  const menuState = ref(MOBILEMENU_STATE.MAINMENU);

  return { MOBILEMENU_STATE, menuState };
}

export default useMobileMenuState;