<template>
  <div class="contentcreators">
    <v-row align-content="center" justify="center" class="pa-5">
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

        <p v-if="post['_embedded']['author']">
          By
          <v-avatar
            v-if="post['_embedded']['author'][0]['avatar_urls']"
            size="24px"
          >
            <img
              v-if="post['_embedded']['author'][0]['avatar_urls']['24']"
              :alt="post['_embedded']['author'][0]['name']"
              :src="post['_embedded']['author'][0]['avatar_urls']['24']"
            />
          </v-avatar>
          {{ post["_embedded"]["author"][0]["name"] }}
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
      postsUrl: [
        {
          url: "https://blog.mlarpg.com/wp-json/wp/v2/posts",
          categories: [21],
        },
        // {
        //   url: "https://www.mmorpgtips.com/wp-json/wp/v2/posts",
        //   categories: [897],
        // },
      ],
      queryOptions: {
        per_page: 10, // Only retrieve the 2 most recent blog posts.
        page: 1, // Current page of the collection.
        _embed: true, // ["wp:featuredmedia"], //Response should include embedded resources.
        _fields: [
          "date",
          "excerpt",
          "title",
          "jetpack_featured_media_url",
          "_links.author",
        ],
      },
      // Returned Posts in an Array
      posts: [],
    };
  },
  methods: {
    // Get Recent Posts From WordPress Site
    getRecentMessages() {
      for (var i = 0; i < this.postsUrl.length; i++) {
        this.queryOptions.categories = this.postsUrl[i].categories;

        axios
          .get(this.postsUrl[i].url, {
            params: this.queryOptions,
          })
          .then((response) => {
            this.posts = this.posts.concat(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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