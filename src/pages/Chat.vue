<script setup>
import { ref } from "vue";

import ChatUsersOnlineBar from "../components/ChatUsersOnlineBar.vue";
import ChatMessages from "../components/ChatMessages.vue";
import MobileMenu from "../components/MobileMenu/MobileMenu.vue";

import userStateAndFunctions from "../functions/useChatStateAndFunctions.js";

const selectedChatRoom = ref("chats");

</script>

<template>
  <MobileMenu />
  <div
    class="
      w-full
      min-h-screen
      max-h-screen
      flex flex-row
      bg-gradient-to-b
      from-slate-800
      to-slate-700
      p-2
      gap-2
    "
  >
    <div class="hidden md:flex w-48 md:flex-col justify-start">
      <ChatUsersOnlineBar />
    </div>
    <ChatMessages :chatRoomName="selectedChatRoom" />
  </div>
</template>

<style>
.button-logout {
  @apply bg-slate-600 rounded shadow text-white text-base font-semibold px-6 py-2;
  @apply hover:bg-slate-500 focus:bg-slate-500;
}
</style>