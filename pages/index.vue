<template>
  <div>

    <div class="container py-8">
      <header>
        <img src="logo.png" style="max-width: 300px;margin: 0 auto" alt="SoupChef">
      </header>
      <main class="py-8">
        <h2 class="text-center mb-2 text-5xl font-bold text-gray-800">Place Your Order for Pickup <i class="far fa-shopping-cart"></i></h2>
        <h2 class="text-center mb-12 text-xl text-gray-700">Available for pickup from 10am-4pm Mon-Friday.</h2>
        <hr class="mx-32 mb-12">
        <p class="text-gray-500 text-xs">* Select the items you can to order, view order summary and checkout.</p>
      </main>
      
      <section class="mb-6 rounded shadow border p-4"  v-bind:key="category" v-for="category in menu.categories">
        <h3 class="bg-gray-200 text-xl mb-3 rounded font-bold text-gray-600 p-2" >{{category.name}}</h3>
        <div @click="addItem(menuItem)" class="menu-item mb-6" v-bind:key="menuItem" v-for="menuItem in category.menus">
          <h4 class="font-bold mb-1 text-gray-800">{{menuItem.name}} <span class="float-right font-bold">{{menuItem.price}}</span></h4>
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
      <div class="font-bold">Total: ${{totalSummary}}</div>

      <button type="button" style="position: fixed; bottom: 10px; width: 270px;" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
        Place Your Order
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
        total += parseFloat(menuItem.price, 2)
      });
      return total
    }
  }

}
</script>

<style scoped>
</style>
