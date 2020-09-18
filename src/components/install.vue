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
      title: 'Daily Karma ShowCase',
      loadingComponent: null
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
        if (mutation.type === 'user/SET_AUTH_KEY') {
          this.loadingComponent = this.$buefy.loading.open({
            container: null
          });
          this.authorizeInstall();
        }
        if (mutation.type === 'user/INSTALL_AUTHORIZED') {
          this.$buefy.toast.open({
            message: this.$t('notify.install.success'),
            type: 'is-success'
          });
          this.loadingComponent.close();
          this.$router.push({name: 'dashboard'});
        }
      });
    },
    ...mapActions({
      setAuthKey: 'user/setAuthKey',
      runAuthorization: 'user/runAuthorization'
    }),
    ...mapGetters({
      authKey: 'user/getAuthKey'
    }),
    initDashboard() {
    },
    startInstallation() {
      this.$buefy.dialog.prompt({
        message: `Enter your Authorization key`,
        inputAttrs: {
          placeholder: '',
          maxlength: 32
        },
        trapFocus: true,
        onConfirm: (auth_key) => this.setAuthorizationKey(auth_key)
      });
    },
    setAuthorizationKey(auth_key) {
      this.setAuthKey(auth_key)
          .then(() => {
            this.$buefy.toast.open({
              message: this.$t('notify.install.auth.key_installed'),
              type: 'is-success'
            });
          })
          .catch((err) => {
            this.$buefy.toast.open({
              message: `${err.message}`,
              type: 'is-warning'
            });
          });
    },
    async authorizeInstall() {
      await this.runAuthorization();
    },
  },
}
</script>