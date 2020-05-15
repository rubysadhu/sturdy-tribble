const axios = require('axios').default;

module.exports = async ( req, res ) => {
  const order_id = req.query.order_id
  const get_order_gql = `query MyQuery {
    pickup_orders(where: {id: {_eq: ${order_id}}}) {
      customer_name
      order_items {
        notes
        menu_item {
          name
          price
        }
      }
    }
  }`

  const response = (
    await axios.post('https://hasura-3udj.onrender.com/v1/graphql', {
      query: get_order_gql
    })
  ).data

  res.json({result: response})
}
