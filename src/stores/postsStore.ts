import { defineStore } from 'pinia';
import { Post } from '@/models/post';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    filteredPosts: [] as Post[],
    searchIndex: [] as { name: string; id: string; post: Post }[],
  }),
  actions: {
    async loadPosts() {
      const storedPosts = localStorage.getItem('posts');
      
      if (storedPosts && JSON.parse(storedPosts).length) {
        this.posts = JSON.parse(storedPosts);
        this.buildSearchIndex();
        this.filteredPosts = this.posts;
      } else {
        try {
          const response = await fetch('/posts.json');
          const data: { posts: Post[] } = await response.json();
          this.posts = data.posts;
          this.buildSearchIndex();
          this.filteredPosts = data.posts;
          this.savePosts();
        } catch (error) {
          console.error('Error loading posts:', error);
        }
      }
    },

    buildSearchIndex() {
      this.searchIndex = this.posts.map(post => ({
        name: post.name.toLowerCase(),
        id: post.id.toLowerCase(),
        post,
      }));
    },

    searchPosts(query: string) {
      const lowerQuery = query.toLowerCase();
      if (!lowerQuery) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.searchIndex
          .filter(entry => entry.name.includes(lowerQuery) || entry.id.includes(lowerQuery))
          .map(entry => entry.post);
      }
    },

    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
      this.buildSearchIndex();
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
