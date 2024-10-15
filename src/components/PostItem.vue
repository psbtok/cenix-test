<template>
    <v-list-item>
      <v-list-item-title v-if="!isEditing">{{ post.name }}</v-list-item-title>
      <v-list-item-title v-else>
        <v-text-field
          v-model="editedPostName"
          @keyup.enter="saveEdit"
          @blur="cancelEdit"
          label="Edit Post Name"
          dense
        />
      </v-list-item-title>
      <v-list-item>
        <v-btn v-if="!isEditing" @click="emitEdit()">Edit</v-btn>
        <v-btn v-if="isEditing" @click="saveEdit()">Save</v-btn>
        <v-btn @click="emitDelete()">Delete</v-btn>
      </v-list-item>
    </v-list-item>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';
  import { Post } from '@/models/post';
  
  export default defineComponent({
    props: {
      post: {
        type: Object as PropType<Post>,
        required: true,
      },
    },
    emits: ['save', 'delete', 'edit'],
    setup(props, { emit }) {
      const isEditing = ref(false);
      const editedPostName = ref(props.post.name);
  
      const emitEdit = () => {
        isEditing.value = true;
      };
  
      const saveEdit = () => {
        emit('save', editedPostName.value); 
        isEditing.value = false;
      };
  
      const emitDelete = () => {
        emit('delete', props.post.id);
      };
  
      const cancelEdit = () => {
        editedPostName.value = props.post.name;
        isEditing.value = false;
      };
  
      return {
        isEditing,
        editedPostName,
        emitEdit,
        saveEdit,
        cancelEdit,
        emitDelete,
      };
    },
  });
  </script>
  