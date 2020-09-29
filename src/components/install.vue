<template>
  <div id="container">
    <div class="install-page columns">
      <div class="column" v-if="!install_started">
        <p class="dk-title">You have not installed DailyKarma</p>
        <div class="install" @click="install_started=!install_started" v-if="!install_started">
          <p>Install</p>
        </div>
      </div>

      <div class="user-data column is-half is-offset-3" v-if="install_started">
        <p class="dk-title">Please, fill out your info</p>
        <br/>
        <div class="columns">
          <div class="column is-half">
            <b-input v-model="owner" value="" placeholder="owner full name"></b-input>
            <b-input v-on:blur="fetchStoreData" type="email" v-model="email" value="" placeholder="email" maxlength="30"></b-input>
            <b-input v-model="auth_key" type="text" placeholder="Authorization key"></b-input>
          </div>
          <div class="column is-half">
            <b-input v-model="domain" value="" placeholder="domain"></b-input>
            <b-input v-model="name" value="" placeholder="store name"></b-input>
            <b-input v-model="currency" value="" placeholder="currency"></b-input>
            <b-input v-model="timezone" value="" placeholder="timezone"></b-input>
            <b-input v-model="line1" value="" placeholder="address"></b-input>
            <b-input v-model="city" value="" placeholder="city"></b-input>
            <b-input v-model="province" value="" placeholder="province"></b-input>
            <b-input v-model="postalCode" value="" placeholder="postal code"></b-input>
            <b-input v-model="country" value="" placeholder="country"></b-input>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
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
      owner: '',
      email: '',
      auth_key: '',
      domain: '',
      name: '',
      currency: '',
      timezone: '',
      line1: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
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
        if (mutation.type === 'user/SET_STORE_DATA') {
          this.loadingComponent = this.$buefy.loading.open({
            container: null
          });
          this.authorizeInstall();
        }
        if (mutation.type === 'user/GET_STORE_DATA') {
          this.owner = this.userData().owner;
          this.domain = this.userData().domain;
          this.name = this.userData().name;
          this.currency = this.userData().currency;
          this.line1 = this.userData().address;
          this.timezone = this.userData().timezone;
          this.city = this.userData().city;
          this.province = this.userData().province;
          this.timezone = this.userData().timezone;
          this.postalCode = this.userData().postalCode;
          this.country = this.userData().country;
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
      setStoreData: 'user/setStoreData',
      getStoreData: 'user/getStoreData',
      runAuthorization: 'user/runAuthorization',
    }),
    ...mapGetters({
      authKey: 'user/getAuthKey',
      userData: 'user/userData'
    }),
    initDashboard() {
    },
    startInstallation() {
      const store_data = {
        'owner': this.owner,
        'email': this.email,
        'auth_key': this.auth_key,
        'domain': this.domain,
        'name': this.name,
        'currency': this.currency,
        'timezone': this.timezone,
        'address': this.line1,
        'city': this.city,
        'province': this.province,
        'postalCode': this.postalCode,
        'country': this.country,
      }
      this.setStoreData(store_data)
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
    fetchStoreData() {
      if (this.email.length) {
        this.getStoreData(this.email);
      }
    }
  },
}
</script>