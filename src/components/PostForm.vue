<template>
  <v-form class="form" @submit.prevent="handleSubmit">
    <v-text-field 
      class="input"
      hide-details="auto" 
      v-model="postName" 
      label="Post Name" 
      required
      flat
      solo
    ></v-text-field>
    <v-btn class="button" type="submit">Add Post</v-btn>
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
        if (!postName.value.length) {
          return;
        }

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

<style scoped>
  .form {
    margin-top: 12px;
    display: flex;
    align-items: center;
  }
  
  .button {
    margin-left: 16px;
    border-radius: 0 !important;
    height: 48px !important;
  }
</style>
  
