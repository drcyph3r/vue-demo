import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { title: "Login" }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: { title: "Create Post" }
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: { title: "Posts" }
  },
  {
    path: "/post/:id",
    component: Post
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    meta: { title: "Error 404" }
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
    meta: { title: "Error 404" }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
