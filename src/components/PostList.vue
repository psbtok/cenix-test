<template>
  <v-list>
    <v-list-item-group v-if="posts.length" color="primary">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @save="savePost(post.id, $event)"
        @delete="deletePost(post.id)"
      />
    </v-list-item-group>
    <v-list-item v-else>
      <v-list-item-title>No posts available</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePostStore } from '@/stores/postsStore';
import PostItem from '@/components/PostItem.vue'; // Adjust the path as needed

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const postStore = usePostStore();

    const savePost = (id: string, updatedName: string) => {
      postStore.editPost(id, updatedName);
    };

    const deletePost = (id: string) => {
      postStore.deletePost(id);
    };

    return {
      posts: postStore.posts,
      savePost,
      deletePost,
    };
  },
});
</script>
