<template>
<div class="">

  <!-- Title -->
  <div class="border-b border-gray-500 shadow p-5">
    <h1 class="font-bold text-xl">Kitchen backend</h1>
  </div>

  <!-- Kanban View -->
  <div class="grid grid-cols-3 gap-0 h-screen bg-gray-400">

    <!-- PENDING -->
    <div class="border-r border-gray-500">
      <div class=" border-b border-gray-500 shadow p-5 bg-white sticky flex items-center">
        <div class="pendingBlock"></div>
        <h2 class="font-bold text-lg">Pending Orders</h2>
      </div>
      <div class="">

        <slide-y-up-transition group>
          <div v-for="(order, index) in pending_orders" :key="index" class="rounded bg-white shadow p-5 m-5">
            <h1 class="text-xs opacity-75 mb-2">ORDER ID: {{ order.id }}</h1>
            <div class="flex items-center text-lg mb-3 justify-between font-bold">
              <h2>{{ order.customer_name }}</h2>
              <h2>{{ order.customer_phone_number }}</h2>
            </div>
            <div class="flex items-center mt-2">
              <div class="bg-gray-200 hover:bg-gray-300 flex-grow mr-5 cursor-pointer font-bold py-2 px-4 rounded flex justify-between">
                <span>View Order</span>
                <span>( {{ order.order_items_aggregate.aggregate.count }} )</span>
                <span>$14.50</span>
              </div>
              <div @click="confirmOrder(order)" class="bg-blue-500 hover:bg-green-500 text-center flex-grow cursor-pointer text-white font-bold py-2 px-4 rounded">Confirm</div>
            </div>
          </div>
        </slide-y-up-transition>

      </div>
    </div>

    <!-- COOKING -->

    <div class="border-r border-gray-500">
      <div class=" border-b border-gray-500 shadow p-5 bg-white sticky flex items-center">
        <div class="pendingBlock" style="background: #8d84d1;"></div>
        <h2 class="font-bold text-lg">Confirmed Orders ( Cooking! )</h2>
      </div>
      <div class="">

        <slide-y-up-transition group>
          <div v-for="(order, index) in active_orders" :key="index" class="rounded bg-white shadow p-5 m-5">
            <h1 class="text-xs opacity-75 mb-2">ORDER ID: {{ order.id }}</h1>
            <div class="flex items-center text-lg mb-3 justify-between font-bold">
              <h2>{{ order.customer_name }}</h2>
              <h2>{{ order.customer_phone_number }}</h2>
            </div>
            <div class="flex items-center mt-2">
              <div class="bg-gray-200 hover:bg-gray-300 flex-grow mr-5 cursor-pointer font-bold py-2 px-4 rounded flex justify-between">
                <span>View Order</span>
                <span>( {{ order.order_items_aggregate.aggregate.count }} )</span>
                <span>$14.50</span>
              </div>
              <div @click="completeOrder(order)" class="bg-green-500 hover:bg-orange-500 text-center flex-grow cursor-pointer text-white font-bold py-2 px-4 rounded">Pick'd Up!</div>
            </div>
          </div>
        </slide-y-up-transition>

      </div>
    </div>

    <!-- COMPLETED -->
    <div>
      <div class=" border-b border-gray-500 shadow p-5 bg-white sticky flex items-center">
        <div class="pendingBlock" style="background: #DDD;"></div>
        <h2 class="font-bold text-lg">Completed Orders</h2>
      </div>
      <div class="">

        <div v-for="(order, index) in completed_orders" :key="index" class="rounded bg-white shadow p-5 m-5">
          <h1 class="text-xs opacity-75 mb-2">ORDER ID: {{ order.id }}</h1>
          <div class="flex items-center text-lg mb-3 justify-between font-bold">
            <h2>{{ order.customer_name }}</h2>
            <h2>{{ order.customer_phone_number }}</h2>
          </div>
          <div class="flex items-center mt-2">
            <div class="bg-gray-200 hover:bg-gray-300 flex-grow mr-5 cursor-pointer font-bold py-2 px-4 rounded flex justify-between">
              <span>View Order</span>
              <span>( {{ order.order_items_aggregate.aggregate.count }} )</span>
              <span>$14.50</span>
            </div>
            <!-- <div class="bg-green-500 hover:bg-orange-500 text-center flex-grow cursor-pointer text-white font-bold py-2 px-4 rounded">Pick'd Up!</div> -->
          </div>
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
import _ from "lodash";

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
      'pickup_orders': {
        query: getOrders,
        variables() {
          return {
            ID: this.$route.params.id
          }
        },
        result( {
          data
        } ) {
          this.orders = data.pickup_orders
        },
      },
    },
  },

  methods: {

    confirmOrder( order ) {

      this.$apollo.mutate( {
        mutation: confirmOrder,
        variables: {
          ID: order.id,
        }
      } )

    },

    completeOrder( order ) {
      this.$apollo.mutate( {
        mutation: completeOrder,
        variables: {
          ID: order.id,
        }
      } )
    }

  },

  computed: {

    pending_orders() {
      let results = _.filter( this.orders, { confirmed: false, completed: false } );
      return results
    },

    active_orders() {
      let results = _.filter( this.orders, { confirmed: true, completed: false } );
      return results
    },

    completed_orders() {
      let results = _.filter( this.orders, { completed: true } );
      return results
    }

  }

}
</script>

<style scoped>
.pendingBlock {
  height: 20px;
  width: 20px;
  background: #eeb846;
  border-radius: 20px;
  margin-right: 10px;
}
</style>
