<template>
  <v-container>
    <PostForm />
    <PostList />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';

export default defineComponent({
  components: {
    PostList,
    PostForm,
  },
});
</script>
