<template>

  <div class="">
    <adminNav active="dashboard" />
    <div class="container pt-6">
      <h2 class="text-3xl font-black mb-4">SoupChef Store</h2>
      <div class="mb-12">
        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total Sales
                </dt>
                <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                  ${{total_sales}}
                </dd>
              </dl>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total Orders
                </dt>
                <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                  {{total_orders}}
                </dd>
              </dl>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dl>
                <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                  Store Visitors
                </dt>
                <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                  {{total_visitors}}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-3xl font-medium mb-2">How to Use</h2>
      <p class="mb-12 text-lg text-gray-600">Here's how to use the online ordering system. You (store owner) can use this app to monitor and process online orders.</p>
      <div class="flex mb-6">
        <div class="w-1/3">
          <h3 class="font-bold text-xl mb-2">Kitchen</h3>
          <p class="mb-3 text-gray-600">View pending orders, confirm or communicate with customers and process the order using the Kanban workflow.</p>
        </div>
        <div class="w-1/3">
          <h3 class="font-bold text-xl mb-2">Edit Menu</h3>
          <p class="mb-3 text-gray-600">Add new categories and add new menu items. You have full Create, Read, Update and Delete access.</p>
        </div>
        <div class="w-1/3">
          <h3 class="font-bold text-xl mb-2">Past Orders</h3>
          <p class="mb-3 text-gray-600">Search and manage all of the past orders to pull any information on any order in seconds.</p>
        </div>
      </div>

      <button @click="testAPI()">click to test API</button>

      <p class="text-sm text-gray-600 mb-3">Hasura Database: https://hasura-3udj.onrender.com/console/data/schema/public</p>
      <p class="text-sm text-gray-600 mb-3">Vercel Web Hosting: https://vercel.com/monetizedesign/super-duper-rotary-phone-2</p>
      <p class="text-sm text-gray-600 mb-3">Twilio SMS: https://www.twilio.com/</p>
    </div>

  </div>

</template>

<script>

  import getOrders from '@/api/get_all_order'
  import { SlideYUpTransition } from 'vue2-transitions'
  import _ from 'lodash'

  export default {
    layout: 'admin',

    components: {
      SlideYUpTransition
    },

    data() {
      return {
        total_sales: 0,
        total_orders: 0,
        total_visitors: 0,
        conversion_rate: 0
      }
    },

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
            this.total_sales = this.calcOrderTotalSales(data.pickup_orders)
            this.total_orders = this.calcOrderTotal(data.pickup_orders)
          }
        }
      }
    },

    methods: {
      testAPI() {
        const dataURL = 'http://localhost:3000/api/test?order_id=36'
        $.getJSON(dataURL, function(data) {
          console.log(data, 'data')
        });
        console.log('hey')
      },
      calcOrderTotalSales(pickup_orders) {
        let total = 0
        pickup_orders.forEach(item => {
          item.order_items.forEach(item2 => {
            total += parseFloat(item2.menu_item.price)
          })
        })
        return total.toFixed(2)
      },
      calcOrderTotal(pickup_orders) {
        let total = 0
        pickup_orders.forEach(item => {
          total++
        })
        return total
      },
    },

    computed: {}
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
