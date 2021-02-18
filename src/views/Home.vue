<template>
  <div class="home">
    <div id="app-timer" class="container-fluid m-auto text-center">
      <h1>Open Beta starts in:</h1>
      <div class="row">
        <div class="col-sm" v-for="time in this.times" v-bind:key="time.id">
          <div class="card text-center">
            <div class="card-block">
              <h4 class="card-title">{{ time.text }}</h4>
            </div>
            <div class="card-footer">
              {{ time.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
                If you weren't one of the lucky ones who got access to the
                Closed Alpha, don't worry, the highly-anticipated
                <a href="/beta"
                  >Magic: Legends PC Open Beta launches on
                  <strong>March 23, 2021</strong></a
                >.
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
              Join us and be an Alpha!
            </h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" md="10">
                Join our
                <a href="https://discord.gg/Ubaepf4pUJ"
                  >Discord <v-icon>mdi-discord</v-icon></a
                >
                and social medial before <strong>March 23, 2021</strong>, and
                win the "<strong>Alpha role</strong>".
                <br />
                Members with this role will have unique access to private
                channels where you can vote to decide what we should implement
                or improve next.
                <br />
                We will support Magic: Legends content creators by sharing their
                content.
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
                Due to Magic: Legends non-discloser agreement, we still don't
                have all the data needed to make this website usable.
                Nevertheless, we made it available with the official leaked
                information to get your feedback and focus on improving what, in
                your opinion, is more important!
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
export default {
  name: "Home",
  data() {
    return {
      startTime: "February 12, 2021 12:03:00",
      endTime: "2021-03-23T18:00:00.000+00:00",
      times: [
        { id: 0, text: "Days", time: 1 },
        { id: 1, text: "Hours", time: 1 },
        { id: 2, text: "Minutes", time: 1 },
        { id: 3, text: "Seconds", time: 1 },
      ],
      progress: 100,
      // isActive: false,
      timeinterval: undefined,
    };
  },
  methods: {
    updateTimer: function () {
      if (
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
        this.updateProgressBar();
      } else {
        clearTimeout(this.timeinterval);
        // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
      }
    },
    getTimeRemaining: function () {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
      if (t >= 0) {
        this.times[3].time = Math.floor((t / 1000) % 60); //seconds
        this.times[2].time = Math.floor((t / 1000 / 60) % 60); //minutes
        this.times[1].time = Math.floor((t / (1000 * 60 * 60)) % 24); //hours
        this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)); //days
      } else {
        this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
      }
    },
    updateProgressBar: function () {
      let startTime = Date.parse(new Date(this.startTime));
      let currentTime = Date.parse(new Date());
      let endTime = Date.parse(new Date(this.endTime));
      let interval = parseFloat(
        ((currentTime - startTime) / (endTime - startTime)) * 100
      ).toFixed(2);
      this.progress = 100 - interval;
    },
  },
  created: function () {
    this.updateTimer();
    this.timeinterval = setInterval(this.updateTimer, 1000);
  },
};
</script>

<style>
.card-title {
  padding: 1em;
}
.card {
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  padding-bottom: 0em;
  margin-bottom: 1em;
}
</style>