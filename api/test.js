module.exports = ( req, res ) => {
  const order_id = req.query.order_id

  $axios.setHeader('x-hasura-admin-secret', 'soupnazi')
  let response = (
    await $axios.$post('https://hasura-3udj.onrender.com/v1/graphql', {
      query: `query {
                pickup_orders(where: {id: {_eq: ${order_id}}})
              }`
    })
  ).data


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
