<template>
  <div id="container">
    DailyKarma API

    <div v-for="item in charities.all">
      <p class="charity">{{ item.name }}</p>
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
        // ...
      });
    },
    ...mapActions({
      getCharities: 'charities/fetchCharities',
    }),
    ...mapGetters({}),
    initDashboard() {
      this.getCharities();
    },
  },
}
</script>