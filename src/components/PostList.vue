<template>
  <v-list class="list-container">
    <v-list class="list" v-if="filteredPosts.length" color="primary">
      <PostItem
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        :class="{ 'selected-post': selectedPostId === post.id }"
        @click="selectPost(post.id)"
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
import { defineComponent, onMounted, computed, ref } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import PostItem from '@/components/PostItem.vue';

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const postStore = usePostStore();
    const selectedPostId = ref<string | null>(null); 

    const loadPosts = () => {
      postStore.loadPosts();
    };

    const selectPost = (id: string) => {
      selectedPostId.value = id;
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
      selectedPostId,
      selectPost,
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

.selected-post {
  background-color: #f5f0ff;
}
</style>
