<template>
  <div id="container">
    <div class="columns is-mobile">
      <div class="column is-4">
        <fieldset>
          <legend>Select Campaign Type</legend>
          <div class="block">
          <b-radio v-model="campaign_type"
                   name="name"
                   native-value="percent-of-sales">
            Percent of Sales
          </b-radio>
          <b-radio v-model="campaign_type"
                   name="name"
                   native-value="donation-tiers">
            Donation Tiers
          </b-radio>
        </div>
        </fieldset>
        <div v-if="campaign_type == 'percent-of-sales'" class="columns percent-of-sales">
          <div class="column is-half">
            <div class="block">
              <b-field label="Amount">
                <b-input v-model="percent_of_sales_amount" placeholder="Amount"></b-input>
              </b-field>
              <b-field label="Type">
                <b-select placeholder="Select a type" v-model="percent_of_sales_type">
                  <option value="fixed">Fixed</option>
                  <option value="percent">Percent</option>
                </b-select>
              </b-field>
            </div>
            <div class="block">
              <b-button @click="addPercentSalesItem">Add Item</b-button>
            </div>
          </div>
        </div>
        <div v-if="campaign_type == 'donation-tiers'" class="columns donation-tiers">
          <div class="column is-half">
            <div class="block">
              <b-field label="Amount">
                <b-input v-model="donation_tier_amount" placeholder="Amount"></b-input>
              </b-field>
              <b-field label="SKU">
                <b-input v-model="donation_tier_sku" placeholder="SKU"></b-input>
              </b-field>
            </div>
            <div class="block">
              <b-button @click="addDonationTierItem">Add Item</b-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="campaign_items.length" class="column is-4">
        <div class="block">
          <b-button type="is-info is-light" @click="createNewCampaign">Create New Campaign</b-button>
        </div>
        <div class="block">
          <div class="content campaign-items">
            <ol>
              <li v-for="item in campaign_items">
                <ul>
                  <li v-for="(value, attr) in item">{{ attr }} = {{ value }}</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      title: 'Daily Karma ShowCase',
      loadingComponent: null,
      campaign_type: '',
      campaign_items: [],
      donation_tier_amount: null,
      donation_tier_sku: null,
      percent_of_sales_amount: null,
      percent_of_sales_type: null,
    }
  },
  created() {
    this.unSubscribeEvents = this.initEventHandlers();
  },
  destroyed() {
  },
  mounted() {
  },
  beforeDestroy() {
    this.unSubscribeEvents();
  },
  watch: {
    campaign_type(new_value, old_value) {
      this.campaign_items = [];
    }
  },
  computed: {
    ...mapGetters({
      foundCharities: 'charity/getFoundCharities',
    }),
  },
  methods: {
    initEventHandlers() {
      return this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'campaign/CREATE_CAMPAIGN') {
          this.$buefy.toast.open({
            message: this.$t('notify.campaign.create.success'),
            type: 'is-success'
          });
          this.$router.push({name: 'dashboard'});
        }
      });
    },
    ...mapActions({
      createCampaign: 'campaign/create',
    }),
    showLoader(status) {
      if (status) {
        this.loadingComponent = this.$buefy.loading.open({
          container: null
        });
      } else {
        if (this.loadingComponent) {
          this.loadingComponent.close();
        }
      }
    },
    addPercentSalesItem() {
      this.campaign_items.push({
        "amount": this.percent_of_sales_amount,
        "type": this.percent_of_sales_type,
      });
    },
    addDonationTierItem() {
      this.campaign_items.push({
        "amount": this.donation_tier_amount,
        "sku": this.donation_tier_sku
      });
    },
    createNewCampaign() {
      this.createCampaign({
        "type": this.campaign_type,
        "payload": {
          "items": this.campaign_items
        }
      });
    }
  },
}
</script>