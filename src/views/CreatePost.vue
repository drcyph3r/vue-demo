<template>
  <div>
    <navbar />
    <div class="w-full md:max-w-xl mx-auto p-6 min-h-screen">
      <router-link to="/posts">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
      <form class="mt-8" @submit.prevent="createPost">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Title
        </label>
        <input
          v-model="form.title"
          class="appearance-none border rounded w-full mb-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
          id="title"
          type="text"
          placeholder="Title"
          required
        />
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Body
        </label>
        <textarea
          v-model="form.body"
          class="appearance-none border rounded w-full mb-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
          id="body"
          type="text"
          rows="8"
          placeholder="Description"
          required
        />
        <button
          type="submit"
          class="p-2 w-full bg-black flex justify-center rounded-md text-white appearance-none focus:outline-none"
        >
          <svg
            v-if="ui.loading"
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <i v-else-if="ui.success" class="fas fa-check text-white"></i>
          <span v-else>Create Post</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },

  data() {
    return {
      ui: {
        loading: false,
        success: false,
      },
      form: {
        title: "",
        body: "",
      },
    };
  },

  methods: {
    async createPost() {
      this.ui.loading = true;
      try {
        await this.$http.post("https://jsonplaceholder.typicode.com/posts", {
          title: this.form.title,
          body: this.form.body,
          userId: this.$store.state.userId,
        });
        this.ui.loading = false;
        this.ui.success = true;
        setTimeout(() => {
          this.ui.success = false;
          this.$router.push("/posts");
        }, 800);
      } catch (error) {
        this.ui.loading = false;
        console.log(error);
      }
    },
  },
};
</script>
