import { ref as vueRef, computed, nextTick } from "vue";

import {
  onChildAdded,
  getDatabase,
  ref,
  push as pushKey,
  set,
  query,
  limitToLast,
} from "firebase/database";

function useChatStateAndFunctions(chatRoomName) {
  const chatMessages = vueRef([]);
  const roomName = vueRef(chatRoomName);

  const getChatMessages = computed(() => chatMessages);
  const getChatRoomName = computed(() => roomName);

  const onChatMessagesUpdate = () => {
    const db = getDatabase();
    const chatRef = query(ref(db, chatRoomName), limitToLast(50));

    onChildAdded(chatRef, (snapshot) => {
      chatMessages.value.push({ key: snapshot.key, ...snapshot.val() });

      nextTick(() => {
        scrollDownAfterAppendMessage();
      });
    });
  };

  const sendMessageToChat = (userName, message) => {
    const db = getDatabase();
    const chatRef = ref(db, chatRoomName);
    const newMessage = pushKey(chatRef);

    set(newMessage, {
      author: userName,
      body: message,
    });
  };

  const sendErrorMessageToChat = (message) => {
    chatMessages.value.push({
      key: Date.now() + Math.random(),
      author: "Vue Firebase Chatter",
      body: message,
    });

    nextTick(() => scrollDownAfterAppendMessage());
  };

  const scrollDownAfterAppendMessage = () => {
    const messagesContainer = document.getElementById("messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const spliceChatMessagesTo = (count) => {
    chatMessages.value.splice(0, chatMessages.value.length - count);
  };

  return {
    getChatMessages,
    getChatRoomName,
    sendMessageToChat,
    sendErrorMessageToChat,
    onChatMessagesUpdate,
  };
}

export default useChatStateAndFunctions;
