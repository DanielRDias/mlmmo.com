<template>
  <v-container>
    <v-layout wrap v-if="!user">
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">Enter your code.</h3>
            </v-layout>
          </v-card-title>
          <v-card-subtitle> Please check your email </v-card-subtitle>
          <v-alert v-if="error" type="error">
            {{ error.message }}
          </v-alert>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              outline
              label="Code"
              type="text"
              v-model="code"
            ></v-text-field>
            <v-text-field
              outline
              label="Username"
              type="text"
              v-model="username"
            ></v-text-field>
            <v-text-field
              outline
              hide-details
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <br />
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              @click="confirmSignUp"
              ><v-icon left>mdi-counter</v-icon>
              Confirm Code and login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm12 md6 offset-md3>
        <v-layout align-center justify-space-between>
          <v-btn color="info" text href="/login">
            Already have an account? Login
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-card v-if="user">
      <v-card-title>You are already logged in.</v-card-title>
      <v-card-text @click="logout" link>
        <v-btn> <v-icon>mdi-logout</v-icon> Click here to Logout </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    error: "",
    code: "",
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
    async confirmSignUp() {
      this.error = "";
      if (!this.username || !this.code) {
        this.error = { message: "Please provide the required information." };
        return;
      }

      try {
        const { username, password, code } = this;
        await this.$store.dispatch("auth/confirmSignUp", {
          username,
          code,
        });
        await this.$store.dispatch("auth/login", {
          username,
          password,
        });
        this.$router.push("/deckbuilder");
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
