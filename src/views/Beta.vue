<template>
  <div id="app-timer" class="container-fluid m-auto text-center">
    <h1>Magic: Legends open beta starts in:</h1>
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
</template>


<script>
export default {
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