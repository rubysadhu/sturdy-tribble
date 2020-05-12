<template>
  <div>
    <div id="overlay" v-if="completeOrder||showProductInfo" @click="closeModals" class="bg-gray-700 opacity-75" style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>
    
    <div id="product-info" v-if="showProductInfo" class="bg-white rounded p-6 shadow" style="left: 50%;top:20%;position: fixed;width: 600px;margin-left: -300px;z-index: 999">
      <h3 class="font-bold text-gray-800 text-xl">{{currentProduct.name}}</h3>
      <p class="text-gray-600 mb-3">{{currentProduct.description}}</p>
      <textarea v-model="notes" class="bg-gray-200 mb-3 focus:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style="height: 100px" placeholder="Notes"></textarea>

      <button @click="addItem(currentProduct)" class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Add to Cart
      </button>
    </div>


    <div id="order-info" v-if="completeOrder" class="bg-white rounded p-6 shadow" style="left: 50%;top:20%;position: fixed;width: 600px;margin-left: -300px;z-index: 999">
      <h2 class="text-2xl text-gray-600 font-bold mb-2">Place Your Order Now</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone Number">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Notes
        </label>
        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="notes" placeholder="Any additions.."></textarea>
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Place Order
      </button>
    </div>
    
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
      
      <section class="mb-12 bg-gray-200 p-4 rounded-md"   v-for="category in menu.categories">
        <h3 class="text-xl rounded text-gray-800" >{{category.name}}</h3>
        <p class="text-sm mb-3 rounded text-gray-500" >{{category.description}}</p>
        <div @click="getProduct(menuItem)" class="bg-white rounded-md p-4 mb-2 cursor-pointer hover:shadow-lg transition-all duration-500"  v-for="menuItem in category.menus">
          <h4 class="font-bold text-gray-800">{{menuItem.name}} <span class="float-right font-bold">${{menuItem.price}}</span></h4>
          <p class="text-gray-600 text-sm">{{menuItem.description}}</p>
        </div>
      </section>

    </div>

    <div id="sidebar" class="bg-white shadow border-l p-4">
      <h4 class="font-bold mb-4">Summary:</h4>
 
      <div id="summary" v-for="item in summary">
        <span>{{item.name}}</span>
        <span class="float-right">${{item.price}}</span>
        <p class="ml-2 text-xs">{{item.notes}}</p>
      </div>
      <hr class="my-3">
      <div class="font-bold text-sm">Food &amp; Beverage Total: ${{totalSummary}}</div>
      <small class="block text-gray-500">* HST included</small>

      <button @click="completeOrder=true" type="button" style="position: fixed; bottom: 10px; width: 270px;" class="w-full font-bold inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
        CHECKOUT
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData( { $axios, store, params } ) {
    $axios.setHeader('x-hasura-admin-secret', 'soupnazi')
    let response = ( await $axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", 
    {query:  `query GetMenuItems {
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
  })).data;
    return {
      menu: response
    }
  },

  data() { return {
    menu: null,
    summary: [],
    completeOrder: false,
    showProductInfo: false,
    currentProduct: {},
    notes: ''
  } },

  methods: {
    addItem(item) {
      let newItem = item
      newItem.notes = this.notes
      this.summary.push(newItem)
      this.closeModals()
      this.notes = ''
    },
    closeModals() {
      this.completeOrder = false
      this.showProductInfo = false
    },
    getProduct(item) {
      let product = {
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "notes": item.notes
      }
      this.currentProduct = product
      this.showProductInfo = true
    }
  },

  computed: {
    totalSummary() {
      let total = 0
      this.summary.forEach(menuItem => {
        total += parseFloat(menuItem.price)
      });
      return total
    }
  }

}
</script>

<style scoped>
</style>
