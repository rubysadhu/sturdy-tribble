<template>

  <div class="">
    <h3 class="mb-4">Twilio Tests</h3>
    <button @click="sendSMS()" class="bg-red-500 p-4">Click to Send SMS Message</button>
  </div>

</template>

<script>

  import getOrders from '@/api/get_all_order'
  import { SlideYUpTransition } from 'vue2-transitions'
  import _ from 'lodash'

  // require('~/send_sms.js')();

  import sendTheSMS from '@/api/send_sms'



  export default {
    layout: 'admin',

    data() {
      return {
      }
    },
    methods: {
      sendSMS() {
        sendTheSMS()

      }
    },

    computed: {}
  }

</script>

<style scoped>

</style>
