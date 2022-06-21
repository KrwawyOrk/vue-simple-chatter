//I changed in the import to vueRef because there is a collision with a ref from the firebase library.... we usually write: const usersOnlineList = ref([]);
import { ref as vueRef, computed } from "vue";
import { getDatabase, ref, onValue, set } from "firebase/database";

import userStateAndFunctions from "./userStateAndFunctions";

function useUsersOnlineListStateAndFunctions() {
  const { getUserId, getUserEmail } = userStateAndFunctions;
  const usersOnlineList = vueRef([]);

  const getUsersOnlineList = computed(() => usersOnlineList);

  const clearUsersOnlineList = () => {
    usersOnlineList.value = [];
  };

  const onUpdateUsersOnlineList = () => {
    const db = getDatabase();
    const usersOnlineListRef = ref(db, "chat_users");

    onValue(usersOnlineListRef, (snapshot) => {
      usersOnlineList.value = snapshot.val();
    });
  };

  const setUserStatusOnline = (status) => {
    const db = getDatabase();

    set(ref(db, "chat_users/" + getUserId.value), {
      name: getUserEmail.value,
      online: status,
      isWrittingMessage: false,
      lastLoginDate: createLastLoginDate(),
    });
  };

  const createLastLoginDate = () => {
    const today = new Date();
    const lastLoginDate =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    return lastLoginDate;
  };

  return {
    getUsersOnlineList,
    onUpdateUsersOnlineList,
    setUserStatusOnline,
    clearUsersOnlineList,
  };
}

export default useUsersOnlineListStateAndFunctions;
