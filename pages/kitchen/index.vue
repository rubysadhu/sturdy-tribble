<template>

  <div class="">

    <div id="overlay"
         v-if="viewOrderPopup"
         class="bg-gray-900 opacity-75 transition ease-in-out duration-200"
         style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>

    <slide-y-up-transition>

      <div v-if="viewOrderPopup" class="bg-white relative rounded-md p-6 shadow-md" style="left: 5%;top:5%;position: fixed;width: 90%;z-index: 999">
        <i @click="closeModals()"
           class="cursor-pointer absolute top-0 right-0 py-2 px-4 text-5xl leading-none tracking-none text-gray-800 far fa-times"></i>
        <div>
          <h3 class="text-lg leading-6 font-medium mb-3 text-gray-700">
            Order #{{viewedOrder.id}}
          </h3>
          <h3 class="text-2xl leading-6 font-bold mb-1 text-gray-900">{{ viewedOrder.customer_name }}</h3>
          <h5 class="text-xl font-normal">{{ viewedOrder.customer_phone_number }}</h5>
        </div>
        <div class="mt-5">
          <dl class="mb-6">
            <div class="mt-6 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-3 -mb-2">
              <dt class="text-md leading-5 font-medium text-gray-500">
                ITEM
              </dt>
              <dd class="mt-1 text-md font-medium leading-5 text-gray-500 sm:mt-0 sm:col-span-2">
                NOTES
              </dd>
            </div>
            <div v-for="item in viewedOrder.order_items" :key="item" class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 text-xl">
              <dt class="leading-5 font-medium text-gray-900">
                <span class="mr-3">1</span> {{item.menu_item.name}}
              </dt>
              <dd v-if="item.notes" class="mt-1 italic leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                "{{item.notes}}"
              </dd>
              <dd v-else="item.notes" class="mt-1 italic leading-5 text-gray-400 font-bold sm:mt-0 sm:col-span-2">
                <i class="far fa-horizontal-rule"></i>
              </dd>
            </div>
          </dl>
          <div v-if="!viewedOrder.confirmed"
               @click="confirmOrder(viewedOrder)"
               class="bg-green-500 flex-grow text-white text-center uppercase  flex-grow cursor-pointer text-white text-2xl font-bold py-3 px-6 rounded">Confirm Order</div>
        </div>
      </div>

    </slide-y-up-transition>

    <adminNav active="kitchen" />

    <!-- Kanban View -->
    <div class="grid grid-cols-3 gap-0 h-screen">

      <!-- PENDING -->
      <div class="border-r border-gray-300">
        <div style="position:sticky;top:0;left:0;" class=" border-b border-gray-300 p-5 bg-white sticky flex items-center">
          <div class="pendingBlock bg-red-500"></div>
          <h2 class="font-bold text-lg">Pending</h2>
        </div>
        <div class="p-5">

          <slide-y-up-transition group>
            <div v-for="(order, index) in pending_orders" :key="index" class="rounded bg-white p-4 mb-2">
              <h1 class="text-sm text-gray-500 mb-1">
                <span class="float-right">{{ order.order_items_aggregate.aggregate.count }} Items</span> #{{ order.id }}
              </h1>
              <div class="flex items-center text-lg mb-3 justify-between font-medium">
                <div>
                  <h3>{{ order.customer_name }}</h3>
                </div>
                <div>${{ calcOrderTotal(order.order_items) }}</div>
              </div>
              <div class=" mt-2">
                <div @click="showPopup(order)" class="bg-red-500 text-lg uppercase text-white cursor-pointer font-bold py-3 px-4 rounded text-center">
                  <span>View Order</span>
                </div>
              </div>
            </div>
          </slide-y-up-transition>

        </div>
      </div>

      <!-- CONFIRMED -->

      <div class="border-r border-gray-300">
        <div style="position:sticky;top:0;left:0;" class=" border-b border-gray-300 p-5 bg-white sticky flex items-center">
          <div class="pendingBlock bg-orange-300"></div>
          <h2 class="font-bold text-lg">Confirmed</h2>
        </div>
        <div class="p-5">

          <slide-y-up-transition group>
            <div v-for="(order, index) in active_orders" :key="index" class="rounded bg-white p-4 mb-2">
              <h1 class="text-sm text-gray-500 mb-1">
                <span class="float-right">{{ order.order_items_aggregate.aggregate.count }} Items</span> #{{ order.id }}
              </h1>
              <div class="flex items-center text-lg mb-3 justify-between font-medium">
                <div>
                  <h3>{{ order.customer_name }}</h3>
                </div>
                <div>${{ calcOrderTotal(order.order_items) }}</div>
              </div>
              <div class="flex items-center mt-2">
                <div @click="showPopup(order)" class="bg-gray-500 uppercase text-lg text-center text-white  mr-3 cursor-pointer font-bold py-3 px-4 rounded">
                  <span>View</span>
                </div>
                <div @click="completeOrder(order)"
                     class="bg-green-500 uppercase text-lg text-center text-white flex-grow cursor-pointer text-white font-bold py-3 px-4 rounded"><i class="fad fa-check-circle mr-1"></i> Mark as Done</div>
              </div>
            </div>
          </slide-y-up-transition>

        </div>
      </div>

      <!-- COMPLETED -->
      <div>
        <div style="position:sticky;top:0;left:0;" class="border-b border-gray-300 p-5 bg-white sticky flex items-center">
          <div class="pendingBlock bg-green-500"></div>
          <h2 class="font-bold text-lg">Completed</h2>
        </div>
        <div class="p-5">

          <div @click="showPopup(order)"
               v-for="(order, index) in completed_orders"
               :key="index"
               class="cursor-pointer text-gray-500 hover:text-gray-800 hover:shadow rounded bg-white p-4 mb-2">
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

  import adminNav from '@/components/admin_nav'

  import { SlideYUpTransition } from 'vue2-transitions'
  import _ from 'lodash'

  export default {
    layout: 'admin',

    components: {
      SlideYUpTransition,
      adminNav
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
      confirmOrder(order) {
        this.$apollo.mutate({
          mutation: confirmOrder,
          variables: {
            ID: order.id
          }
        })
        this.viewOrderPopup = false
      },

      completeOrder(order) {
        this.$apollo.mutate({
          mutation: completeOrder,
          variables: {
            ID: order.id
          }
        })
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
        let results = _.filter(this.orders, { confirmed: false, completed: false })
        let test = results[0]
        // console.log(test)
        return results
      },

      active_orders() {
        let results = _.filter(this.orders, { confirmed: true, completed: false })
        return results
      },

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

</style>
