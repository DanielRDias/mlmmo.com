<template>
  <div class="home">
    <div
      v-html="posts[0].content.rendered"
      style="width: 800px; margin: 0 auto"
    ></div>
    <div id="CookieDeclarationUserStatusPanel">
      <p align="right">
        <v-btn text href="/cookiedeclaration" x-small>
          Manage Cookie Preferences
        </v-btn>
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      // Wordpress Post Endpoint
      postsUrl: "https://blog.mlarpg.com/wp-json/wp/v2/posts?include[]=194",
      queryOptions: {
        _fields: ["content"],
      },
      // Returned Posts in an Array
      posts: [],
    };
  },
  methods: {
    getRecentMessages() {
      axios
        .get(this.postsUrl, { params: this.queryOptions })
        .then((response) => {
          this.posts = response.data;
          console.log("Posts retrieved!");
          console.log(this.posts);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getRecentMessages();
  },
};
</script>

<style>
#app {
  padding: 100px;
}
</style>