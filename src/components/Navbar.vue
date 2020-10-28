<template>
  <div class="w-full border-b border-gray-200 p-4 md:max-w-6xl mx-auto">
    <div class="flex justify-between">
      <router-link to="/posts" class="text-lg font-bold">Post.ly</router-link>
      <nav class="flex space-x-4">
        <router-link to="/posts">Posts</router-link>
        <div class="cursor-pointer" @click="logout">Logout</div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
