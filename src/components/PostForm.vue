<template>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="postName" label="Post Name" required></v-text-field>
      <v-btn type="submit">Add Post</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { usePostStore } from '@/stores/postsStore';
  
  export default defineComponent({
    setup() {
      const postStore = usePostStore();
      const postName = ref('');
  
      const handleSubmit = () => {
        const newPost = {
          id: Date.now().toString(),
          name: postName.value,
        };
        postStore.addPost(newPost);
        postName.value = '';
      };
  
      return {
        postName,
        handleSubmit,
      };
    },
  });
  </script>
  