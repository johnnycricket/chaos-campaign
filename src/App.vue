<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white text-gray-900 p-4 shadow-sm">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">Chaos Campaign</router-link>
        <div class="space-x-4">
          <router-link to="/forces" class="hover:text-gray-600">Forces</router-link>
          <router-link to="/campaigns" class="hover:text-gray-600">Campaigns</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
