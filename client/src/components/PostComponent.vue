<template>
  <v-row class="mb-12 pa-10">
    <v-col >
    <v-sheet 
        elevation="5"
        max-width="700"
        rounded="lg"
        width="100%"
        class="pa-5 text-center mx-auto"
        color="#9BA4B5"
        varian="flat"
      >
        <v-card-title class="headline" id="card-header">CREATE POST</v-card-title>
        <v-form ref='form' @submit.prevent>
          <v-text-field
            v-model="title"
            :rules="[title => !!title || 'This field is required']"
            label="Title"
            variant="solo"
            bg-color="#FFFCF2"
            rounded="xl"
            required
          ></v-text-field>

          <v-textarea
            v-model="text"
            :rules="[text => !!text || 'This field is required']"
            label="What is in your mind?"
            variant="solo"
            bg-color="#FFFCF2"
            rounded="xl"
            required
          ></v-textarea>
          <v-btn @click="createPost" id="card-header" class="mt-1" color="#F1F6F9" rounded="xl" border>Post</v-btn>
        </v-form>
      </v-sheet>
  </v-col>
  <v-col>
    <v-card
      elevation="5"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-1 mx-auto"
      color="#9BA4B5"
      prepend-icon="mdi-post"
    >
      <template v-slot:title>
        <div id="card-header">
          OLD POSTS
        </div>
        
      </template>
    </v-card>
    <v-row 
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      justify="center"
      class="pa-2 ma-2 mx-auto"
      >
      <v-card
        elevation="5"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-3 mx-auto"
        color="#9BA4B5"
      >

      <v-toolbar
        color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6">
          <div class="text-overline" id="card-header">
            {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth() + 1}/${post.createdAt.getFullYear()}` }}
          </div>
          <div class="text-h6" id="card-header">
            {{ post.title }}
          </div>
        </v-toolbar-title>

        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="flat" @click="openEditDialog(post)">
                    Edit
                  </v-btn>
                </v-list-item-title>
                <v-list-item-title>
                  <v-btn variant="flat" @click="deletePost(post._id)">
                    Delete
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar>
        
      <v-card-item>
            <div>
              <div class="text" id="card-text">
                <p class="text">{{ post.text }}</p>
              </div>
            </div>
          
      </v-card-item>

      <v-dialog v-model="editDialog" persistent>
        <v-card
        elevation="5"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-1 mx-auto"
       >
          <v-card-title class="text-h6">Edit Post</v-card-title>
          <v-card-text>
            <v-form ref="editForm">
              <v-text-field 
                label="Title" 
                v-model="editedPost.title"
                :rules="[title => !!title || 'This field is required']"
                variant="solo" 
                bg-color="#F1F6F9" 
                required></v-text-field>
              <v-textarea 
                label="Text" 
                v-model="editedPost.text" 
                :rules="[text => !!text || 'This field is required']"
                variant="solo" 
                bg-color="#F1F6F9" 
                required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updatePost(post._id)">Save</v-btn>
            <v-btn @click="editDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-card>
    </v-row>
  </v-col>
  </v-row>
</template>

<script>
  import { resolveTransitionHooks } from 'vue';
import PostService from '../postService'

  export default {
    name: 'PostComponent',
    data() {
      return {
        posts: [],
        error: [],
        text: '',
        title: '',
        editedPost: {
          title: '',
          text: ''
        },
        editDialog: false,
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
        this.$refs.form.validate();
        if(this.title && this.text){
          await PostService.insertPost(this.title, this.text);
          this.posts = await PostService.getPost();

          this.$refs.form.reset();
        }
      },
      async updatePost(id){
        // this.$ref.editForm.validate();

        if (this.editedPost.title && this.editedPost.text){
          await PostService.updatePost(id, this.editedPost.title, this.editedPost.text);
          this.posts = await PostService.getPost();
          this.editDialog = false;
        }
        
      },
      async deletePost(id){
        await PostService.deletePost(id);
        this.posts = await PostService.getPost();
      },
      openEditDialog(post) {
        this.editDialog = true
        this.editedPost.title = post.title
        this.editedPost.text = post.text
      },
    },
    async mounted(){
      await this.created();
    }
  }
</script>

<style>
#card-text {
  color: #F1F6F9;
}

#card-header{
  color: #212A3E;
  font-weight: bold;
}

#card-menu {
  float: right;
  position: relative;
  width: 134px;
  left: 27px;
}
</style>




