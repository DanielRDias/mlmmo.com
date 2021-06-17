<template>
  <v-container>
    <v-layout wrap v-if="!user">
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section" v-if="!confirmCode">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">Register</h3>
            </v-layout>
          </v-card-title>
          <v-alert v-if="error" type="error">
            {{ error.message }}
          </v-alert>
          <v-divider></v-divider>
          <v-card-text>
            <p>Register with your username, password and email:</p>
            <v-form @submit.prevent="signUp">
              <v-text-field
                outline
                label="Username"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                outline
                label="Email"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
              <v-btn type="submit" style="display: none"></v-btn>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-spacer></v-spacer>
            <p class="caption my-3">
              By clicking Sign Up, you agree to our
              <a href="/termsconditions">Terms of Service</a> and that you have
              read our <a href="/privacypolicy">Privacy Policy</a>.
            </p>
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              @click="signUp"
              ><v-icon left>mdi-account-plus</v-icon>
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card elevation="4" light tag="section" v-if="confirmCode">
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
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              @click="confirmSignUp"
              ><v-icon left>mdi-counter</v-icon>
              Confirm Code
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm12 md6 offset-md3 v-if="!confirmCode">
        <v-layout align-center justify-space-between>
          <v-btn color="info" text href="/login">
            Already have an account? Login
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex sm12 md6 offset-md3 v-if="!confirmCode">
        <v-layout align-center justify-space-between>
          <v-btn color="info" text href="/registercode">
            Have a registration? Enter Code
            <v-icon>mdi-counter</v-icon>
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
    confirmCode: false,
    code: "",
  }),
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
    async signUp() {
      this.error = "";
      if (!this.email || !this.password) {
        this.error = { message: "Please provide the required information." };
        return;
      }
      if (this.password != this.confirmPassword) {
        this.error = {
          message: "Password and confirm password does not match.",
        };
        return;
      }
      try {
        await this.$store.dispatch("auth/signUp", {
          username: this.username,
          password: this.password,
          email: this.email,
        });

        this.confirmCode = true;
      } catch (error) {
        console.log("error");
        console.log(error);
        console.log("error");
        this.error = error;
      }
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
