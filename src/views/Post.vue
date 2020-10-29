<template>
  <div>
    <navbar />
    <div class="w-full md:max-w-6xl mx-auto p-6 min-h-screen">
      <div class="md:max-w-xl mx-auto">
        <content-placeholders v-if="ui.loading">
          <content-placeholders-heading />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
        <div v-else class="mb-8">
          <p class="text-3xl text-gray-900 leading-tight font-semibold mb-6">
            {{ title }}
          </p>
          <p class="text-gray-900">{{ body }}</p>
        </div>

        <div v-if="comments">
          <p class="text-md text-gray-900 font-medium mb-4">Comments</p>
          <form @submit.prevent="submitComment">
            <textarea
              v-model="form.comment"
              class="appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
              id="comment"
              type="text"
              rows="2"
              placeholder="Enter comment..."
              required
            />
            <button
              type="submit"
              class="bg-black text-white text-sm px-6 py-1 mb-6"
            >
              Submit
            </button>
          </form>
          <div v-for="(comment, i) in comments" :key="i" class="mb-4">
            <p class="text-sm">{{ comment.body }}</p>
            <p class="text-xs text-gray-500">{{ comment.email }}</p>
          </div>
        </div>
      </div>
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
      },
      form: {
        comment: "",
      },
      title: null,
      body: null,
      comments: null,
    };
  },
  mounted() {
    this.fetchPost();
    this.fetchComments();
  },
  methods: {
    insertComment(index, item) {
      this.comments.splice(index, 0, item);
    },
    async fetchPost() {
      this.ui.loading = true;
      try {
        let post = await this.$http.get(
          `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
        );
        post = post.data;
        this.title = post.title;
        this.body = post.body;
        this.ui.loading = false;
      } catch (error) {
        this.ui.loading = false;
        this.$router.push("/404");
      }
    },

    async fetchComments() {
      try {
        let comments = await this.$http.get(
          `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}/comments`
        );
        this.comments = comments.data;
      } catch (error) {
        console.log(error);
      }
    },

    submitComment() {
      if (this.form.comment) {
        let comment = this.form.comment;
        this.comments.splice(0, 0, {
          body: comment,
          email: "johndoe@example.com",
        });
        this.form.comment = "";
      }
    },
  },
};
</script>

<style></style>
