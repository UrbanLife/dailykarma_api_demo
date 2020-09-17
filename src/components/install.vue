<template>
  <div id="container">
    <div class="install-page">
      <p>You have not installed DailyKarma</p>
      <div class="install" @click="startInstallation">
        <p>Install</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
      title: 'Daily Karma ShowCase'
    }
  },
  created() {
    this.unSubscribeEvents = this.initEventHandlers();
  },
  destroyed() {
  },
  mounted() {
    this.initDashboard();
  },
  beforeDestroy() {
    this.unSubscribeEvents();
  },
  computed: {
    ...mapState(['charities'])
  },
  methods: {
    initEventHandlers() {
      return this.$store.subscribe((mutation, state) => {
        // ...
      });
    },
    ...mapActions({
      getCharities: 'charities/fetchCharities'
    }),
    ...mapGetters({}),
    initDashboard() {
      // init
    },
    async startInstallation() {
      try {
        let charities = await this.getCharities();
        this.$buefy.toast.open({
          message: this.$t('notify.install.success'),
          type: 'is-success'
        });
        await this.$router.push({name: 'dashboard'});
      } catch (err) {
        this.$buefy.toast.open({
          message: this.$t('notify.install.failed'),
          type: 'is-warning'
        });
      }
    }
  },
}
</script>