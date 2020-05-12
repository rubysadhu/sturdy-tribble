<template>
  <div>
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
      
      <section class="mb-12 bg-gray-200 p-4 rounded-md"  v-bind:key="category" v-for="category in menu.categories">
        <h3 class="text-xl rounded text-gray-800" >{{category.name}}</h3>
        <p class="text-sm mb-3 rounded text-gray-500" >{{category.description}}</p>
        <div @click="addItem(menuItem)" class="bg-white rounded-md p-4 mb-2 cursor-pointer hover:shadow-lg transition-all duration-500" v-bind:key="menuItem" v-for="menuItem in category.menus">
          <h4 class="font-bold text-gray-800">{{menuItem.name}} <span class="float-right font-bold">${{menuItem.price}}</span></h4>
          <p class="text-gray-600 text-sm">{{menuItem.description}}</p>
        </div>
      </section>

    </div>

    <div id="sidebar" class="bg-white shadow border-l p-4">
      <h4 class="font-bold mb-4">Summary:</h4>
 
      <div id="summary" v-bind:key="item" v-for="item in summary">
        <span>{{item.name}}</span>
        <span class="float-right">${{item.price}}</span>
      </div>
      <hr class="my-3">
      <div class="font-bold text-sm">Food &amp; Beverage Total: ${{totalSummary}}</div>
      <small class="block text-gray-500">* HST included</small>

      <button type="button" style="position: fixed; bottom: 10px; width: 270px;" class="w-full font-bold inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
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
    summary: []
  } },

  methods: {
    addItem(item) {
      this.summary.push(item)
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
