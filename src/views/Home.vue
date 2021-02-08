<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="ma-5">
    <v-timeline-item color="primary" fill-dot right>
      <v-card>
        <v-card-title class="primary">
          <v-icon dark size="42" class="mr-4"> mdi-calendar </v-icon>
          <h2 class="display-1 white--text font-weight-light">
            Closed Alpha and Open Beta
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              Before the Open Beta release, the last Closed Alpha will be from
              <strong>February 11 to 22th, 2021</strong>.
              <br />
              If you weren't one of the lucky ones who got access to the Closed
              Alpha, don't worry, the highly-anticipated Magic Legends PC Open
              Beta launches on <strong>March 23, 2021</strong>.
            </v-col>
            <v-col class="hidden-sm-and-down text-right" md="2">
              <v-icon size="64"> mdi-calendar-text </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="red lighten-1" fill-dot left small>
      <v-card>
        <v-card-title class="red lighten-1">
          <v-icon class="mr-4" dark size="42"> mdi-seal-variant </v-icon>
          <h2 class="display-1 white--text font-weight-light">
            Join us and win!
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              Join our
              <a href="https://discord.gg/Ubaepf4pUJ"
                >Discord <v-icon>mdi-discord</v-icon></a
              >
              and social medial before <strong>March 23, 2021</strong>, and win
              the "<strong>Alpha role</strong>".
              <br />
              Members with this role will have unique access to private channels
              where you can vote to decide what we should implement or improve
              next.
            </v-col>
            <v-col class="hidden-sm-and-down text-right" md="2">
              <a
                href="https://discord.gg/Ubaepf4pUJ"
                style="text-decoration: none"
              >
                <v-icon size="64"> mdi-discord </v-icon>
              </a>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item color="green lighten-1" fill-dot right>
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon class="mr-4" dark size="42"> mdi-account-hard-hat </v-icon>
          <h2 class="display-1 white--text font-weight-light">
            Work in progress
          </h2>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              Due to Magic Legends non-discloser agreement, we still don't have
              all the data needed to make this website usable. Nevertheless, we
              made it available with the official leaked information to get your
              feedback and focus on improving what, in your opinion, is more
              important!
              <br />
              Join our
              <a href="https://discord.gg/Ubaepf4pUJ" target="_blank">
                Discord <v-icon>mdi-discord</v-icon></a
              >,
              <a href="https://twitter.com/mlarpg" target="_blank"
                >Twitter <v-icon>mdi-twitter</v-icon> </a
              >,
              <a href="https://www.facebook.com/MLaRPG" target="_blank"
                >Facebook <v-icon>mdi-facebook</v-icon></a
              >
              and share your feedback with us.
              <br />
              We appreciate all the constructive feedback!
            </v-col>
            <v-col class="hidden-sm-and-down text-right" md="2">
              <v-icon size="64"> mdi-alert-circle </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "Home",
};
</script>
