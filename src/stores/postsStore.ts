import { defineStore } from 'pinia';
import { Post } from '@/models/post';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    filteredPosts: []  as Post[]
  }),
  actions: {
    loadPosts() {
      const storedPosts = localStorage.getItem('posts');
      console.log(storedPosts);
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }
    },
    searchPosts(query: string) {
      if (!query) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post => 
          post.name.toLowerCase().includes(query.toLowerCase())
        );
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
      for (const post of this.posts) {
        console.log(post.id == id);
      }

      this.posts = this.posts.filter(post => post.id !== id);
      this.savePosts();
    },
  },
});
