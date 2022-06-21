import { ref, computed } from "vue";

const loginErrorMessage = ref("");
//const createAccountErrorMessage = ref("");

function useErrorMessages() {
  const getLoginErrorMessage = computed(() => loginErrorMessage.value);

  const setloginErrorMessage = (message) => {
    loginErrorMessage.value = message;
  };

  const clearLoginErrorMessage = () => {
    setloginErrorMessage("");
  };

  return { getLoginErrorMessage, setloginErrorMessage, clearLoginErrorMessage };
}

export default useErrorMessages;
