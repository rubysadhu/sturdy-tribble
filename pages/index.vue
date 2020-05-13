<template>
<div>

  <div id="overlay" v-if="completeOrder||showProductInfo" @click="closeModals" class="bg-gray-100 opacity-75 transition ease-in-out duration-200" style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>

  <slide-y-up-transition>

    <div id="product-info" v-if="showProductInfo" class="bg-white rounded p-6 shadow" style="left: 50%;top:20%;position: fixed;width: 600px;margin-left: -300px;z-index: 999">
      <h3 class="font-bold text-gray-800 text-xl">{{currentProduct.name}}</h3>
      <p class="text-gray-600 mb-3">{{currentProduct.description}}</p>
      <textarea v-model="notes" class="bg-gray-200 mb-3 focus:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style="height: 100px" placeholder="Notes"></textarea>

      <button @click="addItem(currentProduct)" class="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add to Cart
      </button>
    </div>

  </slide-y-up-transition>


  <slide-y-up-transition>
    <div id="order-info" v-if="completeOrder" class="bg-white rounded p-6 shadow" style="left: 50%;top:20%;position: fixed;width: 600px;margin-left: -300px;z-index: 999">
      <h2 class="text-2xl text-gray-600 font-bold mb-2">Place Your Order Now</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input v-model="customerName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input v-model="customerPhone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone Number">
      </div>
      <button @click="placeOrder()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Place Order
      </button>
    </div>
  </slide-y-up-transition>

  <div class="container py-8">
    <span class="rounded-lg bg-green-400 text-xs text-white py-1 px-2 font-bold uppercase" style="position: absolute;top: 10px;left:10px;"><i class="fad fa-check-circle mr-1"></i> We Are Open</span>
    <header>
      <img src="logo.png" style="max-width: 300px;margin: 0 auto" alt="SoupChef">
    </header>
    <main class="py-8">
      <h2 class="text-center mb-2 text-5xl font-black text-gray-800">Place Your Pickup Order</h2>
      <h2 class="text-center mb-2 text-xl text-gray-700">Available from 10am-4pm Mon-Friday</h2>
      <p class="text-center mb-6 text-gray-500 italic text-xs">Select the items you want, view order summary and checkout</p>
    </main>

    <section class="mb-12" v-for="category in menu.categories">
      <h3 class="text-xl font-bold rounded text-gray-800">{{category.name}}</h3>
      <p class="text-sm mb-3 rounded text-gray-500">{{category.description}}</p>
      <div @click="getProduct(menuItem)" class="bg-white border-2 border-gray-300 hover:border-gray-700 rounded-md p-4 mb-2 cursor-pointer hover:shadow-md transition-all duration-500" v-for="menuItem in category.menus">
        <h4 class="font-medium text-gray-800">{{menuItem.name}} <span class="float-right">${{menuItem.price}}</span></h4>
        <p class="text-gray-600 text-sm">{{menuItem.description}}</p>
      </div>
    </section>

    <div class="flex items-stretch -mx-2">
      <div class="w-1/3 self-center px-2">
        <img src="soupchef-truck.jpg" class="rounded-lg" alt="">
      </div>
      <div class="w-2/3 self-center px-6">
        <h3 class="text-xl font-black mb-2 text-gray-800">Pickup Your Order @ the SoupChef Truck</h3>
        <p class="text-gray-700 mb-4">Soup Chef Food Truck in Fairfield Park Amherstview is locally owned & operated serving Great home made food overlooking Beautiful Lake Ontario</p>
        <p class="text-gray-600 mb-1"><i class="far fa-truck mr-1"></i> 4574 Bath Rd, Amherstview, Ontario, Canada</p>
        <p class="text-gray-600 mb-1"><i class="far fa-phone mr-1"></i> (613) 453-0449</p>
        <p class="text-gray-600 mb-1"><i class="far fa-envelope mr-1"></i> inquiries@soupchef.ca</p>
      </div>
    </div>

  </div>

  <div id="sidebar" class="shadow border-l p-4">
    <h4 class="font-bold text-xl border-b mb-3 pb-3 border-gray-200">Your Order</h4>

    <slide-x-left-transition tag="div" group>

      <div class="rounded border-b border-gray-200 mb-3 pb-3" v-for="(item, index) in summary" :key="index">

        <div class="flex items-center justify-between">
          <span class="font-medium">{{item.name}}</span>
          <div class="">
            <span class="">${{item.price}}</span>
            <span @click="removeItem(index)" class=" py-1 px-2 bg-gray-500 text-white rounded-full ml-2 cursor-pointer hover:bg-gray-700" style="font-size: .65rem;"><i class="fas fa-times"></i></span>
          </div>
        </div>

        <p v-if="item.notes" class="mx-5 py-1 text-xs text-gray-500 italic">"{{item.notes}}"</p>

      </div>

    </slide-x-left-transition>

    <div style="position: fixed;bottom: 75px;width: 270px;">
      <div class="font-bold">Food &amp; Beverage Total <span class="float-right">${{totalSummary}}</span></div>
      <small class="block text-gray-500">* HST included</small>
    </div>

    <button @click="completeOrder=true" type="button" style="position: fixed; bottom: 10px; width: 270px;" class="w-full font-bold inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
      CHECKOUT
    </button>
  </div>
</div>
</template>

<script>
// Animation
import { SlideXLeftTransition, SlideYUpTransition } from 'vue2-transitions'

export default {

  // Import Components - first import them above
  components: {
    SlideXLeftTransition,
    SlideYUpTransition
  },

  // Called when Page is Loaded ( only on Nuxt )
  async asyncData( { $axios, store, params } ) {
    $axios.setHeader( 'x-hasura-admin-secret', 'soupnazi' )
    let response = ( await $axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
        query: `query GetMenuItems {
            categories {
              name
              description
              menus {
                name
                price
                description
                id
              }
            }
          }`
      } ) )
      .data;
    return {
      menu: response
    }
  },


  // Main Data Store (all variables - only within this page)
  data() {
    return {
      menu: null,
      summary: [],
      completeOrder: false,
      showProductInfo: false,
      currentProduct: {},
      notes: '',
      customerName: '',
      customerPhone: ''
    }
  },

  // All Methods
  methods: {
    addItem( item ) {
      let newItem = item
      newItem.notes = this.notes
      this.summary.push( newItem )
      this.closeModals()
      this.notes = ''
    },
    removeItem( index ) {
      this.summary.splice( index, 1 )
    },
    closeModals() {
      this.completeOrder = false
      this.showProductInfo = false
    },
    getProduct( item ) {
      let product = {
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "notes": item.notes,
        "id": item.id
      }
      this.currentProduct = product
      this.showProductInfo = true
    },
    async placeOrder() {
      this.$axios.setHeader( 'x-hasura-admin-secret', 'soupnazi' )
      let response = ( await this.$axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
          query: `mutation MyMutation {
          insert_pickup_orders_one(object: {confirmation_method: "SMS", customer_phone_number: "${this.customerPhone}", customer_name: "${this.customerName}"}) {
            id
          }
        }`
        } ) )
        .data;
      this.joinTable( response.insert_pickup_orders_one.id )
      // Redirect To Order Confirmation page
      this.$router.push( "/order/" + response.insert_pickup_orders_one.id )
    },

    async joinTable( order_id ) {
      this.summary.forEach( async element => {

        let productResponse = ( await this.$axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
            query: `mutation MyMutation {
            insert_order_items(objects: {menu_id: "${element.id}", order_id: ${order_id}, notes: "${element.notes}"}) {
              returning {
                menu_id
              }
            }
          }`
          } ) )
          .data;
      } )
    }
  },

  // Kind of like Data Variables, but you can change them ( compute them ), they will refresh automatically
  computed: {
    totalSummary() {
      let total = 0
      this.summary.forEach( menuItem => {
        total += parseFloat( menuItem.price )
      } );
      return total
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
</style>
