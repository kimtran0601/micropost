<template>
  <div class="container">
    <h1>Latest Posts</h1>
    
    <div class="create-post">
      <label for="create-post">Say Something</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Post!</button>
    </div>

    <hr>
    <p class="error" v-if="error">{{ error }}</p>

    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="text">{{ post.text }}</p>
        <button v-on:click="deletePost(post._id)">Delete!</button>
      </div>

    </div>
  </div>
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
