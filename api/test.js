const axios = require('axios').default;
module.exports = ( req, res ) => {
  const order_id = req.query.order_id
  axios.setHeader('x-hasura-admin-secret', 'soupnazi')
  let response = 'nothing'
  axios({
    method: 'post',
    url: 'https://hasura-3udj.onrender.com/v1/graphql',
    query: `query {
              pickup_orders(where: {id: {_eq: ${order_id}}})
            }`
  }).then(function (response) {
    console.log('the data', response.data)
    response = response.data
  });


  res.json({result: response})
};
//
// import getOrders from '@/api/get_all_order'
//
// export default {
//   // Data
//   data() {
//     return {
//       orders: []
//     }
//   },
//
//   // Subscription / Real Time
//   apollo: {
//     $subscribe: {
//       pickup_orders: {
//         query: getOrders,
//         variables() {
//           return {
//             ID: this.$route.params.id
//           }
//         },
//         result({ data }) {
//           this.orders = data.pickup_orders
//         }
//       }
//     }
//   }
// }
