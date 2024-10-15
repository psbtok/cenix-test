import { defineStore } from 'pinia';
import { Post } from '@/models/post';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    loadPosts() {
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    },
    addPost(post: Post) {
      this.posts.push(post);
      this.savePosts();
    },
    editPost(id: string, name: string) {
      const post = this.posts.find(post => post.id === id);
      if (post) {
        post.name = name;
        this.savePosts();
      }
    },
    deletePost(id: string) {
      this.posts = this.posts.filter(post => post.id !== id);
      this.savePosts();
    },
  },
});
