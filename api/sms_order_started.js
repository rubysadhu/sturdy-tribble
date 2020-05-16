module.exports = ( req, res ) => {
  const axios = require('axios').default;
  const twilioClient = require('twilio')('ACfe59a083beab96197347e43a1c7652d6', '3ff5e19d05443ac401e649c697e070de');
  const order_id = req.query.order_id
  const get_order_gql = `query getCurrentOrder {
    pickup_orders(where: {id: {_eq: ${order_id}}}) {
      customer_name
      customer_phone_number
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
  let order_total = calcOrderTotal(current_order.order_items)
  let order_details = ''

  current_order.order_items.menu_item.forEach((item, i) => {
    order_details += `- 1  ${item.name}\n`
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

//   twilioClient.messages
//     .create({
//        body: `Thanks for your order, ${current_order.customer_name},
//
// Here's your order:
//
// https://super-duper-rotary-phone-2.now.sh/order/${order_id}
//
// ${order_details}
//
// Total: $${order_total}
// *HST Included
//
// Directions:
//
// 4574 Bath Rd, Amherstview,
// Ontario, Canada
//
// See you at the truck!
//
// Mannette,
// SoupChef`,
//        from: '+15878017440',
//        to: `+{current_order.customer_phone_number}`
//      })
//     .then(message => res.json( message ))
};

function calcOrderTotal(order_items) {
  let total = 0
  order_items.forEach(item => {
    total += parseFloat(item.menu_item.price)
  })
  return total.toFixed(2)
}
