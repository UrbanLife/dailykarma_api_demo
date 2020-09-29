<template>
  <div id="container">
    <div class="columns is-mobile is-centered">
      <div class="charities column is-4">
        <p class="dk-title">Installed Charities</p>
        <div class="btn-browse-charities" @click="browseCharities">
          <p>Browse All Charities</p>
        </div>
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
            <b-button
                :data-id="charity.id"
                class="remove-charity"
                @click="removeCharity($event)"
                type="is-danger is-light is-small is-rounded">Remove
            </b-button>
          </article>
        </div>
      </div>
      <div class="campaigns column is-4">
        <p class="dk-title">Store Campaigns</p>
        <div class="btn-browse-charities" @click="createNewCampaign">
          <p>Create Campaign</p>
        </div>
        <div class="box" v-for="campaign in store_campaigns">
          <!-- Percent Of Sales -->
          <div v-if="campaign.type == campaign_percent_sales">
            <div class="block">
              Type: <span class="title"><i>{{ campaign_type[campaign_percent_sales] }}</i></span>
              <b-button v-if="campaign.connected"
                        class="disconnect-campaign"
                        @click="disconnectCampaign(campaign_percent_sales)"
                        type="is-warning is-light is-small is-pulled-right">Disconnect
              </b-button>
              <b-button v-else
                        class="connect-campaign"
                        @click="connectCampaign(campaign_percent_sales)"
                        type="is-success is-light is-small is-pulled-right">Connect
              </b-button>
            </div>
            <ul v-for="item in campaign.items">
              <li><span>Amount:&nbsp;</span>{{ item.amount }}</li>
              <li><span>Type:&nbsp;</span>{{ item.type }}</li>
            </ul>
          </div>
          <!-- Donation Tiers -->
          <div v-if="campaign.type == campaign_donation_tiers">
            <div class="block">
              Type: <span class="title"><i>{{ campaign_type[campaign_donation_tiers] }}</i></span>
              <b-button v-if="campaign.connected"
                        class="disconnect-campaign"
                        @click="disconnectCampaign(campaign_donation_tiers)"
                        type="is-warning is-light is-small is-pulled-right">Disconnect
              </b-button>
              <b-button v-else
                        class="connect-campaign"
                        @click="connectCampaign(campaign_donation_tiers)"
                        type="is-success is-light is-small is-pulled-right">Connect
              </b-button>
            </div>
            <ul v-for="item in campaign.items">
              <li><span>Amount:&nbsp;</span>{{ item.amount }}</li>
              <li><span>SKU:&nbsp;</span>{{ item.sku }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="campaigns column is-4">
        <p class="dk-title">Store Orders</p>
        <div class="btn-add-order" @click="addNewOrder">
          <p>Add Order</p>
        </div>
        <div class="box">
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
      title: 'DailyKarma',
      installed_charities: null,
      store_campaigns: null,
      campaign_type: {
        "percent-of-sales": "Percent Of Sales",
        "donation-tiers": "Donation Tiers"
      },
      campaign_percent_sales: 'percent-of-sales',
      campaign_donation_tiers: 'donation-tiers',
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
    ...mapState(['charity'])
  },
  methods: {
    initEventHandlers() {
      return this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'charity/FETCH_CHARITIES') {
          this.installed_charities = this.installedCharities();
        }
        if (mutation.type === 'charity/CHARITY_DELETED') {
          this.fetchCharities();
        }
        if (mutation.type === 'campaign/GET_ALL_CAMPAIGNS') {
          this.store_campaigns = this.storeCampaigns();
        }
        if (mutation.type === 'campaign/ACTIVATE_CAMPAIGN') {
          this.$buefy.toast.open({
            message: this.$t('notify.campaign.activate.success'),
            type: 'is-success'
          });
          this.getAllCampaigns();
        }
        if (mutation.type === 'campaign/STOP_CAMPAIGN') {
          this.$buefy.toast.open({
            message: this.$t('notify.campaign.deactivate.success'),
            type: 'is-success'
          });
          this.getAllCampaigns();
        }
      });
    },
    ...mapActions({
      fetchCharities: 'charity/fetchCharities',
      deleteCharity: 'charity/deleteCharity',
      getAllCampaigns: 'campaign/getAll',
      activateCampaign: 'campaign/activate',
      deactivateCampaign: 'campaign/stop',
      getAllOrders: 'order/getAll',
    }),
    ...mapGetters({
      installedCharities: 'charity/getInstalledCharities',
      storeCampaigns: 'campaign/getStoreCampaigns'
    }),
    initDashboard() {
      this.fetchCharities();
      this.getAllCampaigns();
    },
    browseCharities() {
      this.$router.push({name: 'charities'});
    },
    createNewCampaign() {
      this.$router.push({name: 'campaign'});
    },
    addNewOrder() {
      this.$router.push({name: 'order'});
    },
    removeCharity(e) {
      let charity = e.target;
      let charityId = charity.attributes["data-id"].value;
      this.deleteCharity(charityId);
    },
    connectCampaign(type) {
      this.activateCampaign(type);
    },
    disconnectCampaign(type) {
      this.deactivateCampaign(type);
    }
  },
}
</script>