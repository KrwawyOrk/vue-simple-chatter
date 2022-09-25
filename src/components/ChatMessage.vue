<script setup>
defineProps({
  sender: String,
  message: String,
  repeatUserName: Function,
});
</script>

<template>
  <div class="flex flex-col">
    <h1 v-if="repeatUserName() === false" class="font-semibold">
      {{ sender }}
    </h1>
    <h1
      class="
        max-w-fit
        w-4/6
        px-2
        py-1
        bg-slate-200
        rounded
        text-slate-800
        font-light
      "
      :class="sender === 'Vue Firebase Chatter' ? 'text-red-900 font-medium' : ''"
    >
      {{ message }}
    </h1>
  </div>
</template>

<style>
</style>