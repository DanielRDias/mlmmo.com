<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <NuxtLink to="/" v-if="!miniVariant">
        <v-img
          v-if="width < 700"
          src="mlarpg-mobile-logo.png"
          width="200"
          height="100"
          class="center"
        />
        <v-img
          v-else
          src="mlarpg-logo.png"
          width="200"
          height="200"
          class="center"
        />
      </NuxtLink>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div>
              <v-icon class="mr-5">mdi-tools</v-icon>
              <span v-if="!miniVariant">Tools</span>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list-item
              v-for="item in tools"
              :key="item.title"
              :to="item.to"
              link
              class="ml-n5"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item key="Wiki" href="https://wiki.mlarpg.com/" link>
          <v-list-item-icon>
            <v-icon>mdi-wikipedia</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wiki</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item key="account" to="/account" link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" v-if="width < 500" />
      <battle-pass v-else />
      <v-spacer></v-spacer>
      <v-btn icon href="https://discord.gg/Ubaepf4pUJ" target="_blank">
        <v-icon>mdi-discord</v-icon>
      </v-btn>
      <v-btn icon href="https://twitter.com/mlarpg" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <battle-pass v-if="width < 500" />
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }}
        <NuxtLink to="/"> MLaRPG.com </NuxtLink></span
      >
      <v-spacer />
      <Cookie />
    </v-footer>
  </v-app>
</template>

<script>
import BattlePass from '~/components/BattlePass.vue'
import Cookie from '~/components/Cookie.vue'
export default {
  components: {
    BattlePass,
    Cookie,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        { title: 'Decks', icon: 'mdi-playlist-check', to: '/decks' },
        { title: 'Loadout List', icon: 'mdi-newspaper', to: '/loadouts' },
        { title: 'Spells', icon: 'mdi-cards', to: '/cards' },
        { title: 'Artifacts', icon: 'mdi-dots-triangle', to: '/artifacts' },
        { title: 'Equipment', icon: 'mdi-tshirt-crew', to: '/equipments' },
        {
          title: 'Content Creators',
          icon: 'mdi-video-vintage',
          to: '/contentcreators',
        },
        { title: 'Contact', icon: 'mdi-help-box', to: '/contact' },
      ],
      tools: [
        {
          title: 'Deck Builder',
          icon: 'mdi-playlist-edit',
          to: '/deckbuilder',
        },
        {
          title: 'Loadout Builder',
          icon: 'mdi-newspaper-plus',
          to: '/loadoutbuilder',
        },
        { title: 'DPS Tracker', icon: 'mdi-sword-cross', to: '/dpstracker' },
        {
          title: 'Collection Checklist',
          icon: 'mdi-format-list-checks',
          to: '/collectionchecklist',
        },
      ],
      miniVariant: false,
      title: '19 Levels of Battlepass remaining. (19150 EXP)',
    }
  },
  computed: {
    width() {
      return this.$vuetify.breakpoint.width
    },
  },
}
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>