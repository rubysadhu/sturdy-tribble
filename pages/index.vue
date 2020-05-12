<template>
  <div class="container">
    <section class="mb-6 rounded shadow border p-4"  v-for="category in menu.categories">
        <h3 class="bg-gray-200 text-xl mb-3 rounded font-bold text-gray-600 p-2" >{{category.name}}</h3>
        <div @click="addItem(menuItem)" class="menu-item mb-6" v-for="menuItem in category.menus">
            <h4 class="font-bold mb-1 text-gray-800">{{menuItem.name}} <span class="float-right font-bold">{{menuItem.price}}</span></h4>
            <p class="text-gray-600 text-sm">{{menuItem.description}}</p>
        </div>
    </section>

    Summary:
 
    <div id="summary" v-for="item in summary">
      <span>{{item.name}}</span>
      <span>${{item.price}}</span>
    </div>
    <div id="summary-total">${{totalSummary}}</div>
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
