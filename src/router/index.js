import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import CreatePost from "../views/CreatePost.vue";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("userId")) isAuthenticated = true;
  else isAuthenticated = false;

  if (isAuthenticated) {
    next();
  } else {
    next({
      name: "Login"
    });
  }
}

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
    beforeEnter: guardMyroute,
    component: CreatePost,
    meta: { title: "Create Post" }
  },
  {
    path: "/posts",
    name: "Posts",
    beforeEnter: guardMyroute,
    component: Posts,
    meta: { title: "Posts" }
  },
  {
    path: "/post/:id",
    beforeEnter: guardMyroute,
    component: Post
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
