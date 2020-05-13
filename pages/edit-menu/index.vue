<template>
    <div class="">
        <!-- <div id="overlay" v-if="viewOrderPopup" class="bg-gray-900 opacity-75 transition ease-in-out duration-200" style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>

        <slide-y-up-transition>

            <div v-if="viewOrderPopup" class="bg-white relative rounded-md p-6 shadow-md" style="left: 5%;top:5%;position: fixed;width: 90%;z-index: 999">
                <i @click="closeModals()" class="cursor-pointer absolute top-0 right-0 py-2 px-4 text-5xl leading-none tracking-none text-gray-800 far fa-times"></i>
                popup
            </div>

        </slide-y-up-transition> -->


        <!-- Title -->
        <div class="bg-black flex text-white border-b border-gray-300 shadow p-5">
            <div class="w-1/4">
            <img src="logo.png" style="display:inline-block;width: 120px;margin-top: -5px;" alt="">
            <span class="ml-4 rounded-lg p-3 text-gray-500 border-2 border-gray-700" style="margin-top: -10px;"><i class="far fa-store mr-1"></i> Store is Open</span>
            </div>
            <div class="w-3/4 text-right">

            <a href="/dashboard" class="font-bold text-xl mr-4">Dashboard</a>
            <a href="/kitchen" class="font-bold text-xl mr-4">Kitchen</a>
            <a href="/past-orders" class="font-bold text-xl mr-4">Past Orders</a>
            <a href="edit-menu" class="font-bold text-red-500 text-xl">Edit Menu</a>
            </div>
        </div>
        <div class="container pt-6">
            <div class="flex -mx-2">
                <div class="w-1/4 px-2">
                    <h2 class="text-3xl font-black mb-4">Menu</h2>
                    <nav class="mb-6">
                        <a v-for="(category, index) in menu.categories" href="#" class="mb-2 leading-5 font-medium text-gray-900 block rounded-md  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-current="page">
                            <span @click="getCategory(index)" v-if="selectedMenu.name == category.name" class="block p-2 rounded bg-gray-300 text-gray-900 truncate">
                                {{category.name}}
                            </span>
                            <span @click="getCategory(index)" v-else="selectedMenu.name != category.name" class="block p-2 truncate">
                                {{category.name}}
                            </span>
                        </a>
                    </nav>
                    <button @click="newCategory()" class="bg-gray-600 rounded p-2 px-4 font-bold uppercase text-white"><i class="fas fa-plus"></i></button>
                </div>
                <div class="w-3/4 px-2">
                    <div class="p-4 rounded-lg bg-white shadow mb-3">
                      <h4 class="text-xl font-medium mb-4">Edit Category</h4>
                      <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg" v-model="selectedMenu.name" type="text">
                      <textarea class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg" v-model="selectedMenu.description" style="height: 100px"></textarea>
                      <button @click="saveChanges()" v-if="selectedID != null" class="bg-green-500 rounded p-2 px-6 font-bold uppercase text-white">Save Changes</button>
                      <button @click="saveNewCategory()" v-else="" class="bg-green-500 rounded p-2 px-6 font-bold uppercase text-white">Save Category</button>
                    </div>

                    <div class="p-4 rounded-lg bg-white shadow">
                      <h4 class="text-xl font-medium mb-4">Menu Items</h4>
                      <div v-for="menuItem in selectedMenu.menus" class="p-3 border-2 border-gray-400 rounded bg-white mb-3">
                          <button class="float-right bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white"><i class="fal fa-trash-alt"></i></button>
                          <button class="float-right bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white mr-2">Edit</button>
                          <h4 class="font-bold text-lg">{{menuItem.name}} - ${{menuItem.price}}</h4>
                          <p class="text-gray-600">{{menuItem.description}}</p>
                      </div>

                      <button class="bg-blue-500 rounded p-2 px-4 font-bold uppercase text-white"><i class="fas fa-plus"></i></button>
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
        menu: null,
        selectedMenu: null,
        selectedID: null
    }
  },

    // Called when Page is Loaded ( only on Nuxt )
  async asyncData( { $axios, store, params } ) {
    $axios.setHeader( 'x-hasura-admin-secret', 'soupnazi' )
    let response = ( await $axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
        query: `query GetMenuItems {
            categories {
              name
              description
              id
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
    console.log(response)
    return {
      menu: response,
      selectedMenu: response.categories[0],
      selectedID:  response.categories[0].id
    }
  },

  methods: {

    async saveChanges() {
      this.$axios.setHeader( 'x-hasura-admin-secret', 'soupnazi' )
      let response = ( await this.$axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
          query: `mutation {
            update_categories(where: {id: {_eq: "${this.selectedMenu.id}"}}, _set: {name: "${this.selectedMenu.name}", description: "${this.selectedMenu.description}"}) {
              returning {
                id
              }
            }
          }
          `
        } ) )
        .data;
    },
    async saveNewCategory() {
      this.$axios.setHeader( 'x-hasura-admin-secret', 'soupnazi' )
      let response = ( await this.$axios.$post( "https://hasura-3udj.onrender.com/v1/graphql", {
          query: `mutation {
                    insert_categories_one(object: {description: "${this.selectedMenu.description}", name: "${this.selectedMenu.name}"}) {
                      id
                    }
                  }`
        } ) )
        .data;
        this.$router.go({
          path: "/edit-menu",
          force: true
        })
    },
    getCategory(index) {
      this.selectedMenu = this.menu.categories[index]
      this.selectedID = this.selectedMenu.id
    },
    newCategory() {
      console.log(this.selectedID)
      this.selectedID = null
      this.selectedMenu = {
        name: "New Category",
        description: "Awesome new category of amazin' food."
      }
      console.log(this.selectedMenu)
    }

  },

  computed: {



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
