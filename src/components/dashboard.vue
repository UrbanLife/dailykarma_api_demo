<template>
  <div id="container">
    <div class="columns">
      <div class="charities column is-4 is-offset-1">
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
            <div
                :data-id="charity.id"
                class="remove-charity"
                @click="removeCharity($event)">Remove
            </div>
          </article>
        </div>
      </div>
      <div class="campaigns column is-4 is-offset-2">
        <p class="dk-title">Store Campaigns</p>
        <div class="btn-browse-charities" @click="createNewCampaign">
          <p>Create Campaign</p>
        </div>
        <div class="box" v-for="campaign in store_campaigns">
          <p>Type: <span>{{ campaign.type }}</span></p>
          <p>Connected: <span>{{ campaign.connected }}</span></p>
          <ul v-for="item in campaign.items">
            <li>{{ item.sku }}</li>
          </ul>
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
      });
    },
    ...mapActions({
      fetchCharities: 'charity/fetchCharities',
      deleteCharity: 'charity/deleteCharity',
      getAllCampaigns: 'campaign/getAll',
      createCampaign: 'campaign/create',
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
      this.createCampaign({
        "type": "donation-tiers",
        "payload": {
          "items": [
            {"amount": 1, "sku": "test_A", "type": "fixed"},
            {"amount": 2, "sku": "test_B"},
            {"amount": 3, "sku": "test_C"}
          ]
        }
      });
    },
    removeCharity(e) {
      let charity = e.target;
      let charityId = charity.attributes["data-id"].value;
      this.deleteCharity(charityId);
    }
  },
}
</script>