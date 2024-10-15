<template>
    <v-list>
      <v-list-item-group v-if="posts.length" color="primary">
        <v-list-item
          v-for="post in posts"
          :key="post.id"
          @mouseover="hoveredPost = post.id"
          @mouseleave="hoveredPost = null"
        >
          <v-list-item-content
            :style="{ backgroundColor: hoveredPost === post.id ? '#e0e0e0' : 'transparent' }"
          >
            <v-list-item-title v-if="!isEditing[post.id]">{{ post.name }}</v-list-item-title>
            <v-list-item-title v-else>
              <v-text-field
                v-model="editedPostName[post.id]"
                @keyup.enter="saveEdit(post.id)"
                @blur="cancelEdit(post.id)"
                label="Edit Post Name"
                dense
              />
            </v-list-item-title>
            <v-list-item-actions>
              <v-btn v-if="!isEditing[post.id]" @click.stop="editPost(post.id)">Edit</v-btn>
              <v-btn v-if="isEditing[post.id]" @click.stop="saveEdit(post.id)">Save</v-btn>
              <v-btn @click.stop="deletePost(post.id)">Delete</v-btn>
            </v-list-item-actions>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-title>No posts available</v-list-item-title>
      </v-list-item>
    </v-list>
  </template>
  
  <script lang="ts">
    import { usePostStore } from '@/stores/postsStore';
    import { defineComponent, ref } from 'vue';
    import { Post } from '@/models/post';

    export default defineComponent({
    setup() {
        const postStore = usePostStore();
        const hoveredPost = ref<string | null>(null);
        const isEditing = ref<{ [key: string]: boolean }>({});
        const editedPostName = ref<{ [key: string]: string }>({});

        postStore.loadPosts();

        const editPost = (id: string) => {
        isEditing.value[id] = true;
        editedPostName.value[id] = postStore.posts.find((post: Post) => post.id === id)?.name || '';
        };

        const saveEdit = (id: string) => {
        postStore.editPost(id, editedPostName.value[id]);
        isEditing.value[id] = false;
        };

        const cancelEdit = (id: string) => {
        isEditing.value[id] = false;
        };

        const deletePost = (id: string) => {
        postStore.deletePost(id);
        };

        return {
        posts: postStore.posts,
        hoveredPost,
        isEditing,
        editedPostName,
        editPost,
        saveEdit,
        cancelEdit,
        deletePost,
        };
    },
    });
    </script>

  