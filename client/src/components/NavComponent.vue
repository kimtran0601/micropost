<template>
    <v-app-bar
    color="#9BA4B5"
      >
      <template v-slot:prepend>
          <v-icon>mdi-menu</v-icon>
      </template>

        <v-app-bar-title style="color: #212A3E; font-weight: bold;">MY JOURNAL</v-app-bar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
  </template>
  
<script>
 export default {
   name: "Nav",
 };
</script>
  