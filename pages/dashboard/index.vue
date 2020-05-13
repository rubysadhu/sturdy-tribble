<template>
    <div class="">
        <!-- Title -->
        <div class="bg-black flex text-white border-b border-gray-300 shadow p-5">
            <div class="w-1/4">
            <img src="logo.png" style="display:inline-block;width: 120px;margin-top: -5px;" alt="">
            <span class="ml-4 rounded-lg p-3 text-gray-500 border-2 border-gray-700" style="margin-top: -10px;"><i class="far fa-store mr-1"></i> Store is Open</span>
            </div>
            <div class="w-3/4 text-right">
            
            <a href="/dashboard" class="font-bold text-red-500 text-xl mr-4">Dashboard</a>
            <a href="/kitchen" class="font-bold text-xl mr-4">Kitchen</a>
            <a href="/past-orders" class="font-bold text-xl mr-4">Past Orders</a>
            <a href="edit-menu" class="font-bold text-xl">Edit Menu</a>
            </div>
        </div>
        <div class="container pt-6">
            <h2 class="text-3xl font-black mb-4">Store Analytics</h2>
            <div class="mb-12">
                <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <dl>
                        <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                            Total Sales
                        </dt>
                        <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                            $292.21
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
                            182
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
                            1,927
                        </dd>
                        </dl>
                    </div>
                    </div>
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:p-6">
                        <dl>
                        <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                            Conversion Rate
                        </dt>
                        <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                            13.3%
                        </dd>
                        </dl>
                    </div>
                    </div>
                </div>
            </div>
            <h2 class="text-2xl font-medium mb-2">How to Use</h2>
            <p class="mb-3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus quasi voluptatibus quibusdam debitis adipisci dolores nisi commodi sunt iste? Impedit optio nihil repellendus tempora nam pariatur sequi. Laborum, doloremque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, velit perferendis tempore voluptas facere nesciunt earum necessitatibus eius, maxime fugit omnis error eligendi tenetur exercitationem nisi tempora autem consequatur similique.</p>
            <p class="mb-3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique temporibus quasi voluptatibus quibusdam debitis adipisci dolores nisi commodi sunt iste? Impedit optio nihil repellendus tempora nam pariatur sequi. Laborum, doloremque.</p>
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
    }
  },

 

  methods: {

   

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
