<template>
  <div id="container">
    <div class="install-page">
      <p v-if="!install_started">You have not installed DailyKarma</p>
      <div class="install" @click="install_started=!install_started" v-if="!install_started">
        <p>Install</p>
      </div>

      <div v-if="install_started">
        <p>Please, fill out your info</p>
        <br/>
        <div class="columns">
          <div class="user-data column is-2 is-offset-5">
            <b-input v-model="username" value="" placeholder="username"></b-input>
            <br/>
            <b-input type="email"
                     v-model="email"
                     value=""
                     placeholder="email"
                     maxlength="30">
            </b-input>
            <b-input v-model="auth_key" type="text" placeholder="Authorization key"></b-input>
            <br />
            <div class="btn-complete" @click="startInstallation">
              <p>Complete</p>
            </div>
          </div>
        </div>
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
      loadingComponent: null,
      install_started: false,
      username: '',
      email: '',
      auth_key: '',
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
      const user_data = {
        'username': this.username,
        'email': this.email,
        'auth_key': this.auth_key,
      }
      this.setAuthKey(user_data)
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