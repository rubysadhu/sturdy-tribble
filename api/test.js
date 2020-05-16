const axios = require('axios').default;

module.exports = async ( req, res ) => {
  const get_order_gql = `query getCurrentOrder {
    pickup_orders(where: {id: {_eq: ${req.query.order_id}}}) {
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

  const order_total = calcOrderTotal(current_order.order_items)
  let order_details = ''

  console.log(current_order)
  current_order.order_items.forEach((item, i) => {
    order_details += `- 1  ${item.menu_item.name}\n`
  })

  const message = `Thanks for your order, ${current_order.customer_name},

Here's your order:

https://super-duper-rotary-phone-2.now.sh/order/${order_id}

${order_details}

Total: $${order_total}
*HST Included

Directions:

4574 Bath Rd, Amherstview,
Ontario, Canada

See you at the truck!

Mannette,
SoupChef`
res.json({result: message})
}


function calcOrderTotal(order_items) {
  let total = 0
  order_items.forEach(item => {
    total += parseFloat(item.menu_item.price)
  })
  return total.toFixed(2)
}
