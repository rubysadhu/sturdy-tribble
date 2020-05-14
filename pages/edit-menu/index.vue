<template>

  <div class="">
    <div id="overlay"
         v-if="editMenuItemPopup"
         class="bg-gray-900 opacity-75 transition ease-in-out duration-200"
         style="left: 0;top:0;position: fixed;width: 100%;height: 100vh;z-index: 999"></div>

    <slide-y-up-transition>

      <div v-if="editMenuItemPopup" class="bg-white relative rounded-md p-6 shadow-md" style="left: 25%;top:5%;position: fixed;width: 50%;z-index: 999">
        <i @click="closePopup()"
           class="cursor-pointer absolute top-0 right-0 py-2 px-4 text-5xl leading-none tracking-none text-gray-800 far fa-times"></i>
        <div>
          <h3 class="text-2xl leading-6 font-bold mb-6 text-gray-900">Edit Menu Item</h3>
          <label class="font-medium mb-2">Name</label>
          <input v-model="selectedMenuItem.name"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"

                 type="text">
          <label class="font-medium mb-2">Description</label>
          <input v-model="selectedMenuItem.description"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"

                 type="text">
          <label class="font-medium mb-2">Price</label>
          <input v-model="selectedMenuItem.price"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"

                 type="text">
          <button @click="updateMenuItem()" v-if="selectedMenuItemID != null" class="bg-green-500 rounded p-2 px-4 font-bold uppercase text-white">Save</button>

          <button @click="saveNewMenuItem()" v-else="" class="bg-green-500 rounded p-2 px-4 font-bold uppercase text-white">Create</button>
        </div>
      </div>

    </slide-y-up-transition>

    <adminNav active="edit-menu" />
    <div class="container pt-6">
      <div class="flex -mx-2">
        <div class="w-1/4 px-2">
          <h2 class="text-3xl font-black mb-4">Menu</h2>
          <nav class="mb-6">
            <a v-for="(category, index) in menu.categories"
               href="#"
               class="mb-2 leading-5 font-medium text-gray-900 block rounded-md  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"

               aria-current="page">
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
          <div class="p-4 rounded-md bg-white mb-3">
            <h4 v-if="selectedID != null" class="text-xl font-medium mb-4">Edit Category</h4>
            <h4 v-else="" class="text-xl font-medium mb-4">New Category</h4>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg"
                   v-model="selectedMenu.name"
                   type="text">
            <textarea class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg"
                      v-model="selectedMenu.description"
                      style="height: 100px"></textarea>
            <button @click="saveChanges()" v-if="selectedID != null" class="bg-green-500 rounded p-2 px-6 font-bold uppercase text-white">Save Changes</button>
            <button @click="saveNewCategory()" v-else="" class="bg-green-500 rounded p-2 px-6 font-bold uppercase text-white">Save Category</button>
          </div>

          <div v-if="selectedMenu.name" class="p-4 rounded-md bg-white">
            <h4 class="text-xl font-medium mb-4">Menu Items</h4>
            <div v-for="menuItem in selectedMenu.menus" class="p-3 border-2 border-gray-400 rounded bg-white mb-3">
              <button @click="deleteMenuItem(menuItem)"
                      class="float-right bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white"><i class="fal fa-trash-alt"></i></button>
              <button @click="editMenuItem(menuItem)" class="float-right ml-6 bg-gray-500 rounded p-2 px-6 font-bold uppercase text-white mr-2">Edit</button>
              <h4 class="font-bold text-lg">{{menuItem.name}} - ${{menuItem.price}}</h4>
              <p class="text-gray-600">{{menuItem.description}}</p>
            </div>

            <button @click="newMenuItem(selectedMenu.menus)" class="bg-blue-500 rounded p-2 px-4 font-bold uppercase text-white"><i class="fas fa-plus"></i></button>
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
  import _ from 'lodash'

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
        selectedID: null,
        selectedMenuItem: null,
        selectedMenuItemID: null,
        editMenuItemPopup: false
      }
    },

    // Called when Page is Loaded ( only on Nuxt )
    async asyncData({ $axios, store, params }) {
      $axios.setHeader('x-hasura-admin-secret', 'soupnazi')
      let response = (
        await $axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
          query: `query {
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
        })
      ).data
      console.log(response)
      return {
        menu: response,
        selectedMenu: response.categories[0],
        selectedID: response.categories[0].id
      }
    },

    methods: {
      async saveChanges() {
        this.$axios.setHeader('x-hasura-admin-secret', 'soupnazi')
        let response = (
          await this.$axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
            query: `mutation {
              update_categories(where: {id: {_eq: "${this.selectedMenu.id}"}}, _set: {name: "${this.selectedMenu.name}", description: "${this.selectedMenu.description}"}) {
                returning {
                  id
                }
              }
            }
            `
          })
        ).data
      },
      async saveNewCategory() {
        this.$axios.setHeader('x-hasura-admin-secret', 'soupnazi')
        let response = (
          await this.$axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
            query: `mutation {
                      insert_categories_one(object: {description: "${this.selectedMenu.description}", name: "${this.selectedMenu.name}"}) {
                        id
                      }
                    }`
          })
        ).data
        this.$router.go({
          path: '/edit-menu',
          force: true
        })
      },
      async updateMenuItem() {
        this.$axios.setHeader('x-hasura-admin-secret', 'soupnazi')
        let response = (
          await this.$axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
            query: `mutation {
              update_menu_items(where: {id: {_eq: "${this.selectedMenuItem.id}"}}, _set: {name: "${this.selectedMenuItem.name}", description: "${this.selectedMenuItem.description}", price: "${this.selectedMenuItem.price}"}) {
                returning {
                  id
                }
              }
            }
            `
          })
        ).data
        this.editMenuItemPopup = false
      },
      async saveNewMenuItem() {
        this.$axios.setHeader('x-hasura-admin-secret', 'soupnazi')
        let response = (
          await this.$axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
            query: `mutation {
              insert_menu_items_one(object: {category: "${this.selectedID}", name: "${this.selectedMenuItem.name}", description: "${this.selectedMenuItem.description}", price: "${this.selectedMenuItem.price}"}) {
                id
              }
            }
            `
          })
        ).data
        this.editMenuItemPopup = false
      },
      async deleteMenuItem(menu_item) {
        this.$axios.setHeader('x-hasura-admin-secret', 'soupnazi')
        let response = (
          await this.$axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
            query: `mutation {
                      delete_menu_items_by_pk(id: "${menu_item.id}") {
                        id
                      }
                    }`
          })
        ).data
      },
      getCategory(index) {
        this.selectedMenu = this.menu.categories[index]
        this.selectedID = this.selectedMenu.id
        this.selectedMenuItemID = this.menu.categories[index].id
      },
      newCategory() {
        this.selectedID = null
        this.selectedMenu = {}
      },
      editMenuItem(menuItem) {
        this.selectedMenuItem = menuItem
        this.editMenuItemPopup = true
      },
      newMenuItem() {
        this.selectedMenuItemID = null
        this.selectedMenuItem = {}
        this.editMenuItemPopup = true
      },
      closePopup() {
        this.editMenuItemPopup = false
      }
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
