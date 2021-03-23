import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Amplify, * as AmplifyModules from "@aws-amplify/core";
import "@aws-amplify/ui-vue";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
import VueSocialSharing from "vue-social-sharing";
import VueYouTubeEmbed from "vue-youtube-embed";

Amplify.configure(awsconfig);

Vue.config.productionTip = false;

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(VueSocialSharing);
Vue.use(VueYouTubeEmbed);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
