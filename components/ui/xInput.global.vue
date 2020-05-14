<template>
  <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 text-lg"
         :type="type"
         :placeholder="placeholder" >
</template>

<script>
module.exports = {
  props: ['placeholder', 'type'],
  data: function() {
    return {};
  }
};
</script>

<style scoped>

</style>
