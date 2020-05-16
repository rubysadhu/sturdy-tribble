<template>

  <div class="">
    <adminNav active="past-orders" />
    <div class="container pt-6">
      <h2 class="text-3xl font-black mb-4">Past Orders</h2>
      <xInput type="text" placeholder="Search" />
      <div>
        <div @click="showPopup(order)"
             v-for="(order, index) in completed_orders"
             :key="index"
             class="cursor-pointer text-gray-500 hover:text-gray-800 hover:shadow rounded bg-white p-4 mb-2">
          <h1 class="text-sm">#{{ order.id }}</h1>
          <div class="flex items-center text-lg  justify-between font-medium">
            <div>
              <h3>{{ order.customer_name }}</h3>
            </div>
            <div>${{ calcOrderTotal(order.order_items) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import getOrders from '@/api/get_all_order'
  import confirmOrder from '@/api/confirm_order'
  import completeOrder from '@/api/complete_order'

  import { SlideYUpTransition } from 'vue2-transitions'
  import _ from 'lodash'

  export default {
    layout: 'admin',

    components: {
      SlideYUpTransition
    },

    // Data
    data() {
      return {
        orders: []
      }
    },

    // Subscription / Real Time
    apollo: {
      $subscribe: {
        pickup_orders: {
          query: getOrders,
          variables() {
            return {
              ID: this.$route.params.id
            }
          },
          result({ data }) {
            this.orders = data.pickup_orders
          }
        }
      }
    },

    methods: {
      calcOrderTotal(order_items) {
        let total = 0
        order_items.forEach(item => {
          total += parseFloat(item.menu_item.price)
        })
        return total.toFixed(2)
      }
    },

    computed: {
      completed_orders() {
        let results = _.filter(this.orders, { completed: true })
        return results
      }
    }
  }

</script>

<style scoped>

  .pendingBlock {
    height: 20px;
    width: 20px;
    border-radius: 20px;
    margin-right: 10px;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #edf2f7;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #a0aec0;
  }
  .container {
    margin: 0 auto;
    max-width: 960px;
  }

</style>
