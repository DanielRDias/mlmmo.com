<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">Login</h3>
              <v-spacer></v-spacer>
              <v-alert v-if="error.message != null" type="error">{{
                error.message
              }}</v-alert>
              <v-flex> </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Sign in with your username and password:</p>
            <v-form @submit.prevent="login">
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
              <v-btn type="submit" style="display: none"></v-btn>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <vue-recaptcha
              sitekey="6LffQTIaAAAAAOAnt426XA8_YSpoX0SGQzcl8oLJ"
            ></vue-recaptcha>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              @click="login"
            >
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
          </v-card-actions>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-btn color="info" text> Forgot password? </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              :large="$vuetify.breakpoint.smAndUp"
              to="/register"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm12 md6 offset-md3>
        <v-layout align-center justify-space-between>
          <p class="caption my-3">
            <a href="#">Privacy Policy</a>
            |
            <a href="#">Terms of Service</a>
          </p>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import VueRecaptcha from "vue-recaptcha";
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    error: "",
  }),
  components: {
    VueRecaptcha,
  },
  methods: {
    onVerify: function (data) {
      this.$Amplify.Auth.sendCustomChallengeAnswer(this.user, data)
        .then((user) => {
          AmplifyEventBus.$emit("authState", "signedIn");
          return AmplifyEventBus.$emit("localUser", user);
        })
        .catch(function (err) {
          console.log("challenge error: ", err);
        });
    },
    ...mapActions({
      loginVue: "auth/login",
    }),
    async login() {
      try {
        await this.loginVue({
          username: this.username,
          password: this.password,
        });
        this.$router.push("/adddeck");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

