const axios = require('axios').default;
module.exports = ( req, res ) => {
  const order_id = req.query.order_id
  // let response = 'nothing'
  // axios({
  //   method: 'post',
  //   headers: {'x-hasura-admin-secret': 'soupnazi'},
  //   url: 'https://hasura-3udj.onrender.com/v1/graphql',
  //   query: `query {
  //             pickup_orders(where: {id: {_eq: ${order_id}}})
  //           }`
  // }).catch(function (error) {
  //   console.log('the error', error);
  // }).then(function (response) {
  //   console.log('the data', response.data)
  //   response = response.data
  // });

  res.json({result: getOrder(order_id)})
};


async function getOrder(order_id) {
  try {
    const response = (
      await axios.post('https://hasura-3udj.onrender.com/v1/graphql', {
        query:  `query {
                  pickup_orders(where: {id: {_eq: ${order_id}}})
                }`
      })
    ).data
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
