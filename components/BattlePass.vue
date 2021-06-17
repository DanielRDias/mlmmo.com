<template>
  <div>
    {{ bpMessage }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      seasonEnd: '2021-07-20T00:00:00.000+00:00',
      weeklyResetDay: 2, // Sun=0, Mon=1, Tue=2, etc.
      weeklyExp: 1600,
      dailyExp: 375,
      expPerLevel: 1000,
    }
  },
  computed: {
    bpMessage() {
      var bpEndTime = new Date(this.seasonEnd)
      var date = new Date()
      var exp = 0
      while (date < bpEndTime) {
        exp += this.dailyExp
        if (date.getDay() === this.weeklyResetDay) {
          exp += this.weeklyExp
        }
        date.setDate(date.getDate() + 1)
      }
      let levels = Math.floor(exp / this.expPerLevel)
      return levels + ' Levels of Battlepass remaining. (' + exp + ' EXP)'
    },
  },
}
</script>

<style>
</style>