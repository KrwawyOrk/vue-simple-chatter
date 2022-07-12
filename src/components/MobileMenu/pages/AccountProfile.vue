<script setup>
import userStateAndFunctions from "../../../functions/userStateAndFunctions.js";

const { getUserId, getUserEmail } = userStateAndFunctions;
</script>

<template>
  <div class="w-full min-h-screen z-50 fixed left-0 top-0 backdrop-blur-sm">
    <div class="w-full min-h-screen flex justify-center items-center">
      <div
        class="
          flex flex-col
          bg-white
          rounded
          w-4/5
          md:w-4/12
          py-2
          px-2
          shadow-md
        "
      >
        <div class="flex space-x-2 items-center">
          <font-awesome-icon
            icon="fa-solid fa-address-card"
            class="fa-2xl"
            style="color: black"
          />
          <h1 class="font-semibold text-slate-700 text-lg">Profil konta</h1>
        </div>
        <h1>ID: {{ getUserId }}</h1>
        <h1>e-mail: {{ getUserEmail }}</h1>
        <button
          @click="$emit('clicked-returnToMobileMenu')"
          class="button-form bg-slate-700 font-normal text-sm px-4 py-1 mt-5"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<style>
</style>