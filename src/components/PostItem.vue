<template>
  <div class="item">
    <v-text-field
      v-model="editedPostName"
      :readonly="!isEditing"
      class="input"
      :class="!isEditing ? 'not-editing' : 'editing'"
      label="Post Name"
      hide-details="auto" 
      dense
      @keyup.enter="saveEdit"
    />
    <div class="button-container">
      <v-btn class="button" v-if="!isEditing" @click="emitEdit()">Edit</v-btn>
      <v-btn class="button" v-if="isEditing" @click="saveEdit()">Save</v-btn>
      <v-btn class="button" @click="emitDelete()">Delete</v-btn>
    </div>
  </div>
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

<style scoped>
  .item {
    margin-bottom: 16px;
    display: flex;
  }

  .not-editing {
    pointer-events: none;
  }

  .editing {
    background-color: rgb(247, 246, 246);
  }

  .button-container {
    display: flex;
  }

  .button {
    min-width: 80px;
    margin-left: 12px;
    height: 48px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
</style>
