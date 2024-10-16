<template>
  <div class="search-container">
    <v-text-field
      v-model="searchQuery"
      label="Search Posts"
      hide-details="auto" 
      dense
    />
    <v-btn class="button" @click="searchPosts" color="primary" dense>Search</v-btn>
  </div>
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
.search-container {
  margin-bottom: 12px;
  display: flex;
}
.button {
  min-width: 80px;
  margin-left: 12px;
  height: 48px;
}
</style>
  