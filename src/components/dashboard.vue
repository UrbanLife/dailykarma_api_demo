<template>
  <div id="container">
    <div class="is-full column">
      <div class="btn-browse-charities" @click="browseCharities">
        <p>Browse All Charities</p>
      </div>
    </div>
    <div class="installed-charities">
      <div class="box" v-for="charity in installed_charities">
        <article class="media">
          <div class="media-left">
            <figure class="image is-96x96">
              <img :src="charity.thumbnailUrl||'https://bulma.io/images/placeholders/96x96.png'" :alt="charity.name">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ charity.name }}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEraser, faList, faBorderAll, faLink, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {mapActions, mapGetters, mapState} from "vuex";

library.add([
  faEraser, faList, faBorderAll, faLink, faAngleUp, faAngleDown
]);


export default {
  data() {
    return {
      title: 'DailyKarma',
      installed_charities: null,
    };
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
        if (mutation.type === 'charities/INSTALLED_CHARITIES') {
          this.installed_charities = this.installedCharities();
        }
      });
    },
    ...mapActions({
      fetchCharities: 'charities/fetchCharities',
    }),
    ...mapGetters({
      installedCharities: 'charities/getInstalledCharities'
    }),
    initDashboard() {
      this.fetchCharities();
    },
    browseCharities() {
      this.$router.push({ name: 'charities' });
    }
  },
}
</script>