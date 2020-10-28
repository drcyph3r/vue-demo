<template>
  <div
    class="max-w-6xl mx-auto min-h-screen flex flex-col space-y-6 items-center justify-center"
  >
    <p class="text-3xl font-bold">Login</p>
    <form class="flex items-center space-x-2" @submit.prevent="login">
      <input
        v-model="form.email"
        type="email"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
        placeholder="Email"
        required
      />
      <button
        type="submit"
        class="w-10 h-10 bg-black rounded flex items-center justify-center appearance-none focus:outline-none"
        @click="login"
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
        <i v-else class="fas fa-arrow-right text-sm text-white"></i>
      </button>
    </form>
    <p v-if="ui.errMsg" class="text-red-600 text-sm py-2">{{ ui.errMsg }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ui: {
        loading: false,
        errMsg: null,
      },
      form: {
        email: "",
      },
    };
  },
  methods: {
    async getUser(email) {
      const formattedEmail = email.charAt(0).toUpperCase() + email.slice(1);
      let users = await this.$http.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      users = users.data;
      const user = users.find((user) => user.email == formattedEmail);
      if (user) return user;
      return false;
    },

    async login() {
      this.ui.loading = true;
      const user = await this.getUser(this.form.email);
      if (user) {
        // Storing the user in Vuex store
        await localStorage.setItem("userId", user.id);
        this.ui.loading = false;
        this.$router.push("/posts").catch(() => {});
      } else {
        this.ui.loading = false;
        this.ui.errMsg = "User not found!";
      }
    },
  },
};
</script>

<style></style>
