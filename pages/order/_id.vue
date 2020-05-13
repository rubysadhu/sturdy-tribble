<template>

  <div class="container mx-auto">

    <div class="flex justify-between items-center mt-10">
      <h2 class=" font-bold text-2xl">{{ isOrderComplete }}</h2>
      <img src="~/assets/logo1.png" style="width: 150px;" alt="SoupChef">
    </div>

    <div class="flex items-center justify-between my-5 ">

      <!-- Customer Info -->
      <div class="rounded shadow flex items-center p-3 px-5 border-2 border-gray-400 bg-gray-100">
        <h3 class="font-bold text-xl">{{ order.customer_name }}</h3>
        <h4 class="font-bold text-xl ml-2">{{ order.customer_phone_number }}</h4>
      </div>

      <!-- Pick Up Time -->
      <zoom-center-transition>
        <div v-if="order.confirmed && order.completed == false" class="rounded shadow flex items-center p-3 px-5 border-2 border-green-400 bg-green-100 text-xl">
          <i class="far fa-shopping-basket"></i>
          <h1 class="font-bold ml-4 mr-4">Come Pick It Up In 15 Minutes!</h1>
          <!-- <p>4:45pm - ish</p> -->
        </div>
      </zoom-center-transition>

    </div>

    <div class="rounded shadow p-5 pb-5 border-2 border-gray-400 bg-gray-100">

      <div class="grid grid-cols-3 gap-4">

        <div class="flex flex-col items-center text-center justify-center">
          <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_w0cYJr.json" background="transparent" speed="1" style="width: 200px; height: 200px;"
                         loop
                         autoplay></lottie-player>
          <h2 class="font-bold text-2xl ">Order Placed!</h2>
          <p class="">Waiting to confirm the order</p>
          <div class="iconDone">
            <i class="far fa-check-circle"></i>
          </div>
        </div>

        <div :class="order.confirmed ?  'opacity-100' : 'opacity-25'" class="flex flex-col items-center text-center justify-center">

          <lottie-player src="https://assets1.lottiefiles.com/temp/lf20_dRqSdi.json" background="transparent" speed="1" style="width: 200px; height: 200px;"
                         loop
                         autoplay></lottie-player>

          <h2 class="font-bold text-2xl text-center ">Order Confirmed!</h2>
          <p class="text-center">We are cooking your order!</p>

          <div :class="order.confirmed ?  'iconDone' : 'iconWaiting'">
            <i :class="order.confirmed ?  'fa-check-circle' : 'fa-spinner fa-pulse'" class="far"></i>
          </div>

        </div>

        <div :class="order.completed ?  'opacity-100' : 'opacity-25'" class="flex flex-col items-center text-center justify-center opacity-25">

          <lottie-player src="https://assets4.lottiefiles.com/temp/lf20_uD5mKa.json" background="transparent" speed="1" style="width: 200px; height: 200px;"
                         loop
                         autoplay></lottie-player>

          <h2 class="font-bold text-2xl text-center ">Order Pick'd up!</h2>
          <p class="text-center">Enjoy!!!</p>

          <div :class="order.completed ?  'iconDone' : 'iconWaiting'">
            <i :class="order.completed ?  'fa-check-circle' : 'fa-spinner fa-pulse'" class="far"></i>
          </div>

        </div>

      </div>

      <div class="rounded border-2 border-gray-200 bg-white p-5 mt-10 flex items-center">
        <i class="far fa-question-circle mr-2 text-indigo-500"></i> Got a question? Call the truck! 1-292-222-2222
      </div>

    </div>

    <div id="sidebar" class="shadow border-l p-4">
      <h4 class="font-bold text-xl border-b mb-3 pb-3 border-gray-200">Your Order</h4>

      <sequential-entrance fromRight>
        <div class="rounded border-b border-gray-200 mb-3 pb-3" v-for="(item, index) in order.order_items" :key="index">

          <div class="flex items-center justify-between">
            <span class="font-medium">{{item.menu_item.name}}</span>
            <div class="">
              <span class="">${{item.menu_item.price}}</span>
            </div>
          </div>

          <p v-if="item.menu_item.notes" class="mx-5 py-1 text-xs text-gray-500 italic">"{{item.menu_item.notes}}"</p>

        </div>
      </sequential-entrance>

      <div style="border-t border-gray-400 mt-10">
        <div class="font-bold">Food &amp; Beverage Total <span class="float-right">${{ totalSummary }}</span></div>
        <small class="block text-gray-500">* HST included</small>
      </div>

    </div>

    <!-- Happy Bear! -->
    <zoom-center-transition>
      <div v-if="order.completed" class="happyBear">
        <img class="rounded shadow-lg border-2 border-gray-900"
             src="https://media1.giphy.com/media/9Y6n9TR7U07ew/giphy.gif?cid=ecf05e479d05907f698bf566621351d21e9e4c2c905b978b&rid=giphy.gif">
      </div>
    </zoom-center-transition>

  </div>

</template>

<script>

  import getOrder from '@/api/get_order'
  import '@lottiefiles/lottie-player'
  import { SlideXLeftTransition, ZoomCenterTransition } from 'vue2-transitions'

  export default {
    // Data
    data() {
      return {
        order: []
      }
    },

    components: {
      SlideXLeftTransition,
      ZoomCenterTransition
    },

    // Subscription / Real Time
    apollo: {
      $subscribe: {
        pickup_orders: {
          query: getOrder,
          variables() {
            return {
              ID: this.$route.params.id
            }
          },
          result({ data }) {
            this.order = data.pickup_orders[0]
          }
        }
      }
    },

    computed: {
      totalSummary() {
        let total = 0

        if (this.order === undefined || this.order.length == 0) {
          // -- order API hasn't loaded yet...
        } else {
          this.order.order_items.forEach(menuItem => {
            total += parseFloat(menuItem.menu_item.price)
          })
        }

        return total
      },

      isOrderComplete() {
        if (this.order.completed == true) {
          return 'Woo! Enjoy the Grub!!'
        } else {
          if (this.order.confirmed) {
            return 'Cooking Your Food!'
          } else {
            return 'Waiting On Kitchen To Confirm Order...'
          }
        }
      }
    }
  }

</script>

<style scoped>

  .container {
    max-width: 860px;
    margin: 0 auto;
  }

  #sidebar {
    width: 300px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
  }

  .iconDone i {
    color: #13b987;
    font-size: 37px;
    margin-top: 20px;
  }

  .iconWaiting i {
    font-size: 37px;
    margin-top: 20px;
  }

  .happyBear {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .happyBear img {
    width: 300px;
  }

</style>
