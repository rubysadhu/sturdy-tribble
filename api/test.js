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

  const hasura_response = (
    await axios.post('https://hasura-3udj.onrender.com/v1/graphql', {
      query: get_order_gql
    })
  )
  const current_order = hasura_response.data.data
  console.log(hasura_response)

  res.json({result: current_order})
}
