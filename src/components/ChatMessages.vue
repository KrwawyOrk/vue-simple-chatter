<script setup>
import { onMounted, ref } from "vue";

import useChatStateAndFunctions from "../functions/useChatStateAndFunctions.js";
import userStateAndFunctions from "../functions/userStateAndFunctions.js";
import ChatMessage from "./ChatMessage.vue";

const props = defineProps(["chatRoomName"]);

const {
  getChatMessages,
  getChatRoomName,
  sendMessageToChat,
  sendErrorMessageToChat,
  onChatMessagesUpdate,
} = useChatStateAndFunctions(props.chatRoomName);

const { getUserEmail } = userStateAndFunctions;

const inputMessage = ref("");

onMounted(() => {
  onChatMessagesUpdate();
});

const send = () => {
  if (inputMessage.value.length > 0 && inputMessage.value.length <= 100) {
    sendMessageToChat(getUserEmail.value, inputMessage.value);
    clearInputMessage();
  }

  else {
    sendErrorMessageToChat("Twoja wiadomosc nie moze byc dluzsza niz 100 znakow!");
  }
};

const clearInputMessage = () => {
  inputMessage.value = "";
};
</script>

<template>
  <div class="w-full">
    <div
      class="
        flex flex-col
        min-h-full
        max-h-full
        px-4
        py-1
        border
        rounded-xl
        bg-slate-100
        shadow-xl
        justify-between
      "
    >
      <div
        id="messages-container"
        class="overflow-y-auto space-y-2 scroll-smooth"
      >
        <h1
          class="
            max-w-fit
            px-2
            py-1
            bg-slate-200
            rounded
            text-slate-800
            font-semibold
          "
        >
          Welcome {{ getUserEmail }} to {{ getChatRoomName.value }}!!!
        </h1>
        <div v-for="(message, index) in getChatMessages.value" :key="index">
          <ChatMessage
            :sender="message.author"
            :message="message.body"
            :repeatUserName="
              () =>
                index > 0 &&
                getChatMessages.value[index - 1].author === message.author
            "
            class="lg:items-start"
            :class="
              message.author === getUserEmail ? 'items-end' : 'items-start'
            "
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-center">
        <input
          v-model="inputMessage"
          class="message-input w-full"
          placeholder="Wpisz coś... bo nic się nie dzieje :("
        />
        <button @click="send" class="button-send-message w-full md:w-min">
          Wyślij
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.message-input {
  @apply rounded-lg p-2 border h-10 my-2;
  @apply text-slate-700 font-semibold;
  @apply focus:outline-none focus:border-slate-400 placeholder-shown:text-sm;
}

.button-send-message {
  @apply bg-slate-600 rounded shadow text-white text-base font-semibold px-6 py-2;
  @apply hover:bg-slate-500 focus:bg-slate-500;
}
</style>