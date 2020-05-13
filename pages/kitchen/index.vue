<template>
<div class="">

  <div id="overlay" v-if="viewOrderPopup" @click="closeModals" class="bg-gray-100 opacity-75 transition ease-in-out duration-200" style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>

  <slide-y-up-transition>

    <div v-if="viewOrderPopup" class="bg-white rounded p-6 shadow" style="left: 50%;top:0;position: fixed;width: 600px;margin-left: -300px;z-index: 999">
      <div>
        <h3 class="text-lg leading-6 font-bold mb-1 text-gray-900">
          Order #{{viewedOrder.id}}
        </h3>
        <h3>{{ viewedOrder.customer_name }}</h3>
        <h5 class="text-sm font-normal"><i class="fas fa-phone-alt mr-1 text-gray-500"></i> {{ viewedOrder.customer_phone_number }}</h5>
      </div>
      <div class="mt-5">
        <dl class="mb-5">
          <div class="mt-6 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-3 -mb-2">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              ITEM
            </dt>
            <dd class="mt-1 text-sm font-medium leading-5 text-gray-500 sm:mt-0 sm:col-span-2">
              NOTES
            </dd>
          </div>
          <div v-for="item in viewedOrder.order_items" :key="item" class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            
            <dt class="text-sm leading-5 font-medium text-gray-900">
              <span class="mr-3">1</span> {{item.menu_item.name}}
            </dt>
            <dd v-if="item.notes" class="mt-1 text-sm italic leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              "{{item.notes}}"
            </dd>
            <dd v-else="item.notes" class="mt-1 text-sm italic leading-5 text-gray-400 font-bold sm:mt-0 sm:col-span-2">
              <i class="far fa-horizontal-rule"></i>
            </dd>
          </div>
        </dl>
        <div v-if="!viewedOrder.confirmed" @click="confirmOrder(viewedOrder)" class="bg-green-500 flex-grow text-white text-center uppercase  flex-grow cursor-pointer text-white font-bold py-2 px-4 rounded">Confirm Order</div>
      </div>
    </div>

  </slide-y-up-transition>

  <!-- Title -->
  <div class="bg-gray-900 text-white border-b border-gray-300 shadow p-5">
    <h1 class="font-bold text-xl">SoupChef Kitchen</h1>
  </div>

  <!-- Kanban View -->
  <div class="grid grid-cols-3 gap-0 h-screen bg-gray-200">

    <!-- PENDING -->
    <div class="border-r border-gray-300">
      <div class=" border-b border-gray-300 p-5 bg-white sticky flex items-center">
        <div class="pendingBlock bg-red-500"></div>
        <h2 class="font-bold text-lg">Pending</h2>
      </div>
      <div class="p-5">

        <slide-y-up-transition group>
          <div v-for="(order, index) in pending_orders" :key="index" class="rounded bg-white p-4 mb-2">
            <h1 class="text-sm text-gray-500 mb-1">
              <span class="float-right">{{ order.order_items_aggregate.aggregate.count }} Items</span>
              #{{ order.id }}
            </h1>
            <div class="flex items-center text-lg mb-3 justify-between font-medium">
              <div>
                <h3>{{ order.customer_name }}</h3>
              </div>
              <div>${{ calcOrderTotal(order.order_items) }}</div>
            </div>
            <div class=" mt-2">
              <div @click="showPopup(order)" class="bg-red-500 uppercase text-white cursor-pointer font-bold py-2 px-4 rounded text-center">
                <span>View Order</span>
              </div>
            </div>
          </div>
        </slide-y-up-transition>

      </div>
    </div>

    <!-- COOKING -->

    <div class="border-r border-gray-300">
      <div class=" border-b border-gray-300 p-5 bg-white sticky flex items-center">
        <div class="pendingBlock bg-orange-300"></div>
        <h2 class="font-bold text-lg">Confirmed</h2>
      </div>
      <div class="p-5">

        <slide-y-up-transition group>
          <div v-for="(order, index) in active_orders" :key="index" class="rounded bg-white p-4 mb-2">
            <h1 class="text-sm text-gray-500 mb-1">
              <span class="float-right">{{ order.order_items_aggregate.aggregate.count }} Items</span>
              #{{ order.id }}
            </h1>
            <div class="flex items-center text-lg mb-3 justify-between font-medium">
              <div>
                <h3>{{ order.customer_name }}</h3>
              </div>
              <div>${{ calcOrderTotal(order.order_items) }}</div>
            </div>
            <div class="flex items-center mt-2">
              <div @click="showPopup(order)" class="bg-gray-500 uppercase text-center text-white  mr-3 cursor-pointer font-bold py-2 px-6 rounded">
                <span>View</span>
              </div>
              <div @click="completeOrder(order)" class="bg-green-500 uppercase text-center text-white flex-grow cursor-pointer text-white font-bold py-2 px-4 rounded"><i class="fad fa-check-circle mr-1"></i> Completed</div>
            </div>
          </div>
        </slide-y-up-transition>

      </div>
    </div>

    <!-- COMPLETED -->
    <div>
      <div class=" border-b border-gray-300 p-5 bg-white sticky flex items-center">
        <div class="pendingBlock bg-green-500"></div>
        <h2 class="font-bold text-lg">Completed</h2>
      </div>
      <div class="p-5">

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
      orders: [],
      viewOrderPopup: false,
      viewedOrder: {}
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
      this.viewOrderPopup = false
    },

    completeOrder( order ) {
      this.$apollo.mutate( {
        mutation: completeOrder,
        variables: {
          ID: order.id,
        }
      } )
    },

    calcOrderTotal(order_items) {
      let total = 0
      order_items.forEach(item => {
        total += parseFloat(item.menu_item.price)
      })
      return total
    },

    showPopup(order) {
      this.viewOrderPopup = true
      this.viewedOrder = order
    },

    closeModals() {
      this.viewOrderPopup = false
    }

  },

  computed: {

    pending_orders() {
      let results = _.filter( this.orders, { confirmed: false, completed: false } );
      let test = results[0]
      // console.log(test)
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
  border-radius: 20px;
  margin-right: 10px;
}
</style>
