import { defineStore } from 'pinia';
import { Post } from '@/models/post';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    filteredPosts: [] as Post[],
  }),
  actions: {
    
    async loadPosts() {
      const storedPosts = localStorage.getItem('posts');
      
      if (storedPosts && JSON.parse(storedPosts).length) {
        this.posts = JSON.parse(storedPosts);
        this.filteredPosts = this.posts;
      } else {
        try {
          const response = await fetch('/posts.json');
          const data: {'posts': Post[]} = await response.json();
          this.posts = data.posts;
          this.filteredPosts = data.posts;
          this.savePosts();
        } catch (error) {
          console.error('Error loading posts:', error);
        }
      }
    },
    searchPosts(query: string) {
      if (!query) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post =>
          post.name.toLowerCase().includes(query.toLowerCase()) ||
          post.id.toLowerCase().includes(query.toLowerCase())
        );
      }
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
      this.filteredPosts = this.posts;
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
