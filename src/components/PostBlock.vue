<template>
  <div class="p-4 w-full bg-white border rounded-lg border-gray-200 shadow-md">
    <router-link :to="`/post/${article.id}`">
      <div class="flex flex-col">
        <div class="text-xl font-bold text-indigo-500 pb-4">
          {{ article.title }}
        </div>
        <div class="text-gray-900">{{ article.body }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
