<template>
  <div id="container">
    <div class="columns is-mobile order">
      <div class="column is-4">
        <div class="columns">
          <div class="column is-5">
            <fieldset>
              <legend>Order Info</legend>
              <div class="block">
                <b-input v-model="order_id" type="number" placeholder="Order Id"></b-input>
              </div>
              <div class="block">
                <b-input v-model="orderName" placeholder="Order Name"></b-input>
              </div>
              <div class="block">
                <b-select placeholder="Financial Status" v-model="financialStatus">
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="other">Other</option>
                </b-select>
              </div>
              <div class="block">
                <b-input v-model="currency" type="text" placeholder="Currency"></b-input>
              </div>
              <div class="block">
                <b-input v-model="totalPrice" type="number" placeholder="Total Price"></b-input>
              </div>
              <div class="block">
                <b-input v-model="subtotalPrice" type="number" placeholder="Subtotal Price"></b-input>
              </div>
              <div class="block">
                <b-input v-model="totalTax" type="number" placeholder="Total Tax"></b-input>
              </div>
              <div class="block">
                <b-input v-model="shippingPrice" type="number" placeholder="Shipping Price"></b-input>
              </div>
            </fieldset>
          </div>
          <div class="column is-5` is-offset-1">
            <fieldset>
              <legend>Customer</legend>
              <div class="block">
                <b-input v-model="customer.firstName" placeholder="First Name"></b-input>
              </div>
              <div class="block">
                <b-input v-model="customer.lastName" placeholder="Last Name"></b-input>
              </div>
              <div class="block">
                <b-input v-model="customer.email" type="email" placeholder="Email"></b-input>
              </div>
              <div class="block">
                <b-input v-model="customer.province" placeholder="Province"></b-input>
              </div>
              <div class="block">
                <b-input v-model="customer.country" placeholder="Country"></b-input>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <fieldset>
          <legend>New Item</legend>
          <div class="block">
            <b-input v-model="item.id" type="number" placeholder="Id"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.productId" type="number" placeholder="Product Id"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.variantId" type="number" placeholder="Variant Id"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.sku" placeholder="SKU"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.title" placeholder="Title"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.quantity" type="number" placeholder="Quantity"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.price" type="number" placeholder="Price"></b-input>
          </div>
          <div class="block">
            <b-input v-model="item.discountAmount" type="number" placeholder="Discount Amount"></b-input>
          </div>
        </fieldset>
        <br/>
        <div class="block">
          <b-button @click="addOrderItem" class="is-pulled-right">Add Item</b-button>
        </div>
      </div>
      <div class="column is-5">
        <div class="block is-pulled-right">
          <b-button type="is-info is-light" @click="addNewOrder">Add New Order</b-button>
        </div>
        <div class="block">
          <div class="order-items">
            <b-table
                :data="order_items"
                :columns="order_columns"
                focusable
            ></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      title: 'Daily Karma ShowCase',
      order_id: '',
      orderName: '',
      financialStatus: null,
      currency: '',
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        province: '',
        country: ''
      },
      totalPrice: '',
      subtotalPrice: '',
      totalTax: '',
      shippingPrice: '',
      order_items: [],
      item: {
        id: '',
        productId: '',
        variantId: '',
        sku: '',
        title: '',
        quantity: '',
        price: '',
        discountAmount: '',
      },
      order_columns: [
        {
          'field': 'id',
          'label': 'Id',
          'width': '20',
          'numeric': true
        },
        {
          'field': 'productId',
          'label': 'Product Id',
          'width': '20',
          'numeric': true
        },
        {
          'field': 'variantId',
          'label': 'Variant Id',
          'width': '20',
          'numeric': true
        },
        {
          'field': 'sku',
          'label': 'SKU',
          'width': '20',
          'numeric': false
        },
        {
          'field': 'title',
          'label': 'Title',
          'width': '20',
          'numeric': false
        },
        {
          'field': 'quantity',
          'label': 'Quantity',
          'width': '20',
          'numeric': true
        },
        {
          'field': 'price',
          'label': 'Price',
          'width': '20',
          'numeric': true
        },
        {
          'field': 'discountAmount',
          'label': 'Discount Amount',
          'width': '20',
          'numeric': true
        }
      ],
    }
  },
  created() {
    this.unSubscribeEvents = this.initEventHandlers();
  },
  beforeDestroy() {
    this.unSubscribeEvents();
  },
  methods: {
    initEventHandlers() {
      return this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'order/ADD_ORDER') {
          this.$buefy.toast.open({
            message: this.$t('notify.order.create.success'),
            type: 'is-success'
          });
          this.$router.push({name: 'dashboard'});
        }
      });
    },
    ...mapActions({
      addOrder: 'order/add',
    }),
    addOrderItem() {
      for (const [key, value] of Object.entries(this.item)) {
        if (!value.length) {
          this.$buefy.toast.open({
            message: 'Please, fill out all fields',
            type: 'is-warning'
          });
          return;
        }
      }
      this.order_items.push({
        "id": this.item.id,
        "productId": this.item.productId,
        "variantId": this.item.variantId,
        "sku": this.item.sku,
        "title": this.item.title,
        "quantity": this.item.quantity,
        "price": this.item.price,
        "discountAmount": this.item.discountAmount
      });
      this.clearOrderData();
    },
    addNewOrder() {
      const order = {
        'orderId': this.order_id,
        'orderName': this.orderName,
        'financialStatus': this.financialStatus,
        'customer': this.customer,
        'currency': this.currency,
        'totalPrice': this.totalPrice,
        'subtotalPrice': this.subtotalPrice,
        'totalTax': this.totalTax,
        'shippingPrice': this.shippingPrice,
        'items': this.order_items,
        'createdAt': new Date().toISOString(),
      };
      if (this.validatePayload(order) && this.validatePayload(order.customer)) {
        this.addOrder(order);
      }
    },
    clearOrderData() {
      this.item.id = '';
      this.item.productId = '';
      this.item.variantId = '';
      this.item.sku = '';
      this.item.title = '';
      this.item.quantity = '';
      this.item.price = '';
      this.item.discountAmount = '';
    },
    validatePayload(payload) {
      for (const [key, value] of Object.entries(payload)) {
        if (typeof value !== 'object') {
          if (!value.length) {
            this.$buefy.toast.open({
              message: 'Please, fill out all fields',
              type: 'is-warning'
            });
            return false;
          }
        }
      }
      return true;
    }
  },
}
</script>