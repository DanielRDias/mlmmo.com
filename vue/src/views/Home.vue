<template>
  <div class="home">
    <v-row align-content="center" justify="center" class="pa-5">
      <iframe
        src="https://discord.com/widget?id=807590519626530827&theme=dark"
        width="350"
        height="500"
        allowtransparency="true"
        frameborder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        class="pa-5"
      ></iframe>
      <v-card
        v-for="(post, index) in posts"
        :key="index"
        max-width="400"
        class="pa-5 ma-2"
      >
        <v-card-title>{{ post.title.rendered }}</v-card-title>
        <v-row align="center" justify="center">
          <v-img
            v-if="post.jetpack_featured_media_url"
            :src="post.jetpack_featured_media_url"
            max-height="300"
            max-width="300"
          />
        </v-row>
        <v-card-text v-html="post.excerpt.rendered" />
        <p>
          <strong>Published: {{ getPostDate(post.date) }}</strong>
        </p>
      </v-card>
    </v-row>

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
import moment from "moment";
export default {
  data() {
    return {
      // Wordpress Posts Endpoint
      postsUrl: "https://blog.mlarpg.com/wp-json/wp/v2/posts",
      queryOptions: {
        per_page: 10, // Only retrieve the 2 most recent blog posts.
        page: 1, // Current page of the collection.
        //_embed: ["wp:featuredmedia"], //Response should include embedded resources.
        _fields: ["date", "excerpt", "title", "jetpack_featured_media_url"],
        categories: [19],
      },
      // Returned Posts in an Array
      posts: [],
    };
  },
  methods: {
    // Get Recent Posts From WordPress Site
    getRecentMessages() {
      axios
        .get(this.postsUrl, { params: this.queryOptions })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPostDate(date) {
      return moment(date).format("lll");
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
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
</style>