<template>
  <v-app background-color="#FFFCF2">
    <NavComponent />
    <v-main>
      <PostComponent />
    </v-main>
  </v-app>
</template>

<script setup>
  import PostComponent from '@/components/PostComponent.vue'
  import NavComponent from '@/components/NavComponent.vue';
</script>