<template>
    <v-text-field
      v-model="searchQuery"
      @input="searchPosts"
      label="Search Posts"
      dense
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { usePostStore } from '@/stores/postsStore';
  
  export default defineComponent({
    setup() {
      const postStore = usePostStore();
      const searchQuery = ref('');
  
      const searchPosts = () => {
        postStore.searchPosts(searchQuery.value);
      };
  
      return {
        searchQuery,
        searchPosts,
      };
    },
  });
  </script>
  
  <style scoped>
  </style>
  