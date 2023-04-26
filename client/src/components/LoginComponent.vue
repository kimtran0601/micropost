<template>
   <div class="d-flex align-center justify-center h-100">
     <v-card
     elevation="5"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-10 mx-auto"
      color="#9BA4B5"
     >
     <template v-slot:title>
        <div id="card-header" class="text-center">
          Login
        </div>
        
      </template>
       <v-form @submit.prevent>
         <v-text-field
           v-model="username"
           label="Username"
           :rules="[() => !!username || 'This field is required']"
           variant="solo"
           bg-color="#F1F6F9"
           required="true"
         ></v-text-field>
 
         <v-text-field
           v-model="password"
           label="Password"
           type="password"
           :rules="[() => !!password || 'This field is required']"
           variant="solo"
           bg-color="#F1F6F9"
           required="true"
         ></v-text-field>
         <v-btn @click="login" block class="mt-1" color="#F1F6F9">Login</v-btn>
       </v-form>
     </v-card>

     <v-snackbar
      v-model="snackbar"
      :color="color"
      location="center top"
    >
      {{ text }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
   </div>
 </template>
 
 <script>
 import UserService from '../userService'

 export default {
   name: "Login",
   data() {
     return {
       username: "",
       password: "",
       text: "",
       color: "",
       snackbar: false,
     };
   },
   methods: {
      async login() {
         const isAuthen = await UserService.login(this.username, this.password);
         console.log(isAuthen);
         if (isAuthen.data === 'Success'){
            this.text = Success;
            this.color = 'success';
         } else if (isAuthen.data === 'Cannot find user'){
            this.text = 'Cannot find user';
            this.color = 'error';
         } else{
            this.text = "wrong password";
            this.color = 'error'
         }

         this.username = '';
         this.password = '';

         this.snackbar = true;
      },
   },
 };
 </script>