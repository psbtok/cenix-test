<template>
  <v-list class="list">
    <v-list v-if="posts.length" color="primary">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @save="savePost(post.id, $event)"
        @delete="deletePost(post.id)"
      />
    </v-list>
    <v-list-item v-else>
      <v-list-item-title>No posts available</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import PostItem from '@/components/PostItem.vue';

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const postStore = usePostStore();

    const loadPosts = () => {
      postStore.loadPosts();
    };

    const savePost = (id: string, updatedName: string) => {
      postStore.editPost(id, updatedName);
    };

    const deletePost = (id: string) => {
      postStore.deletePost(id);
    };

    onMounted(loadPosts);

    const posts = computed(() => postStore.posts);

    return {
      posts,
      savePost,
      deletePost,
    };
  },
});
</script>

<style scoped>
  .list {
    height: 100%;
  }
</style>
