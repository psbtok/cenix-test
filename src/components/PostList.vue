<template>
  <v-list class="list-container">
    <v-list class="list" v-if="filteredPosts.length" color="primary">
      <PostItem
        v-for="post in filteredPosts"
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

    const filteredPosts = computed(() => postStore.filteredPosts); 

    return {
      filteredPosts,
      savePost,
      deletePost,
    };
  },
});
</script>

<style scoped>
  .list-container {
    height: 100%;
  }

  .list {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
