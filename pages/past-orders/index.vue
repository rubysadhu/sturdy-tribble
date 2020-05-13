<template>
    <div class="">
        <!-- Title -->
        <div class="bg-black flex text-white border-b border-gray-300 shadow p-5">
            <div class="w-1/4">
            <img src="logo.png" style="display:inline-block;width: 120px;margin-top: -5px;" alt="">
            <span class="ml-4 rounded-lg p-3 text-gray-500 border-2 border-gray-700" style="margin-top: -10px;"><i class="far fa-store mr-1"></i> Store is Open</span>
            </div>
            <div class="w-3/4 text-right">
            
            <a href="/dashboard" class="font-bold text-xl mr-4">Dashboard</a>
            <a href="/kitchen" class="font-bold text-xl mr-4">Kitchen</a>
            <a href="/past-orders" class="font-bold text-red-500 text-xl mr-4">Past Orders</a>
            <a href="edit-menu" class="font-bold text-xl">Edit Menu</a>
            </div>
        </div>
        <div class="container pt-6">
            <h2 class="text-3xl font-black mb-4">Past Orders</h2>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg" id="search" type="text" placeholder="Search">
            <div class="overflow-y-scroll" style="position: relative;height: 100vh;padding-bottom: 300px">
                <div @click="showPopup(order)" v-for="(order, index) in completed_orders" :key="index" class="cursor-pointer text-gray-500 hover:text-gray-800 hover:shadow rounded bg-white p-4 mb-2">
                    <h1 class="text-sm">
                        <!-- <span class="float-right"><i class="far fa-check-circle"></i></span> -->
                        #{{ order.id }}
                    </h1>
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

   calcOrderTotal(order_items) {
      let total = 0
      order_items.forEach(item => {
        total += parseFloat(item.menu_item.price)
      })
      return total
    },

  },

  computed: {

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
    background: #a0aec0 
}
.container {
    margin: 0 auto;
    max-width: 960px;
}
</style>
