<script setup>
import CreateAccountForm from "../components/CreateAccountForm.vue";
</script>

<template>
  <div
    class="
      w-full
      flex
      items-center
      justify-center
      min-h-screen
      bg-gradient-to-b
      from-slate-800
      to-slate-700
    "
  >
    <div>
      <div class="w-full flex flex-col justify-center items-center space-y-2">
        <h1 class="text-white font-bold text-sm">// Vue Simple Chatter</h1>
        <CreateAccountForm />

        <div
          v-if="isAccountCreationInProgress"
          class="mt-5 w-full flex flex-col justify-center items-center"
        >
          <Loader />
          <h1 class="text-white font-light mt-2">Trwa tworzenie konta ...</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>