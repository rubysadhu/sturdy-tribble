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



  export default {
    layout: 'admin',

    data() {
      return {
      }
    },
    methods: {
      async sendSMS() {
        var fs = require("fs");
const { URL } = require('url');
        const accountSid = 'ACfe59a083beab96197347e43a1c7652d6';
        const authToken = '1b7154c576de00d23b38f70e15643ab0';
        const twilio = require('twilio');

        const client = new twilio(accountSid, authToken);
        await client.messages
          .create({
             body: 'From a button.',
             statusCallback: 'https://postb.in/b/1589527924144-5734390488360',
             from: '+15878017440',
             to: '+16474068748'
           })
          .then(function(err, messages) {
            console.log(err, message.sid)
          });

      }
    },

    computed: {}
  }

</script>

<style scoped>

</style>
