<template>
  <div>
    <navbar />
    <div class="w-full md:max-w-6xl mx-auto p-6 min-h-screen">
      <div class="mt-2 mb-8 flex items-center justify-between">
        <p class="text-2xl font-bold text-gray-900">Your Posts</p>
        <router-link
          to="/create-post"
          class="md:w-1/4 bg-black flex justify-center rounded-md text-white"
        >
          <button class="p-2 appearance-none focus:outline-none">
            Create Post
          </button>
        </router-link>
      </div>
      <div class="grid md:grid-cols-3 gap-4">
        <post-block
          v-for="(post, i) in posts"
          :key="i"
          :article="post"
          :loading="ui.loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostBlock from "@/components/PostBlock";
import Navbar from "@/components/Navbar";
export default {
  components: { PostBlock, Navbar },
  data() {
    return {
      ui: {
        loading: false,
      },
      posts: [],
    };
  },

  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.ui.loading = true;
      try {
        const posts = await this.$http.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${localStorage.getItem(
            "userId"
          )}`
        );
        this.posts = posts.data;
        this.ui.loading = false;
      } catch (error) {
        this.ui.loading = false;
      }
    },
  },
};
</script>

<style></style>
