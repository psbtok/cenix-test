<template>
  <v-container class="container">
    <PostSearchBar />
    <PostList />
    <PostForm />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';
import PostSearchBar from '../components/PostSearchBar.vue'; 

export default defineComponent({
  components: {
    PostList,
    PostForm,
    PostSearchBar,
  },
});
</script>

<style>
.container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
