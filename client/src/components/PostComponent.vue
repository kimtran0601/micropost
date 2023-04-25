<template>
  <v-col>
    <v-row>
      <v-sheet 
        width="300" 
        class="pa-2 ma-2 mx-auto"
      >
        <v-form @submit.prevent>
          <v-text-field
            v-model="text"
            label="What is in your mind?"
          ></v-text-field>
          <v-btn @click="createPost" block class="mt-1">Post</v-btn>
        </v-form>
      </v-sheet>
    </v-row>

    <v-row 
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      justify="center">
      <v-card
        class="pa-2 ma-2"
        width="300"
        variant="outlined"
      >
        <v-card-item>
          <div>
            <div class="text-h6 mb-1">
              {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
            </div>
              <div class="text-caption">
              
              <p class="text">{{ post.text }}</p>
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn variant="outlined" @click="deletePost(post._id)" color="error">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-col>
  

  
</template>

<script>
  import PostService from '../postService'

  export default {
    name: 'PostComponent',
    data() {
      return {
        posts: [],
        error: [],
        text: '',
      }
    }, 
    methods: {
      async created(){
        try {
          this.posts = await PostService.getPost();
        } catch (error) {
          this.error = error;
        }
      },
      async createPost(){
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPost();
      },
      async deletePost(id){
        await PostService.deletePost(id);
        this.posts = await PostService.getPost();
      },
    },
    async mounted(){
      await this.created();
    }
  }
</script>
