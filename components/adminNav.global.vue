<template>

  <div class="">
    <div class="bg-gray-900 flex text-white border-b border-gray-300 shadow p-5">
      <div class="w-1/4">
        <logo />
        <span class="ml-4 rounded-lg p-3 text-gray-500 border-2 border-gray-700" style="margin-top: -10px;"><i class="far fa-store mr-1"></i> Store is Open</span>
      </div>
      <div class="w-3/4 text-right">
        <a v-bind:class="{ 'text-red-500': active == 'dashboard' }" href="/dashboard" class="font-bold text-xl mr-4">Dashboard</a>
        <a v-bind:class="{ 'text-red-500': active == 'kitchen' }" href="/kitchen" class="font-bold text-xl mr-4">Kitchen</a>
        <a v-bind:class="{ 'text-red-500': active == 'past-orders' }" href="/past-orders" class="font-bold text-xl mr-4">Past Orders</a>
        <a v-bind:class="{ 'text-red-500': active == 'edit-menu' }" href="edit-menu" class="font-bold text-xl">Edit Menu</a>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">

  module.exports = {
    props: ['title', 'active'],
    data: () => {
      return {
        greeting: 'hello'
      }
    }
  }

</script>
<style scoped>

</style>
