export default function( { req } ) {
  return {
    httpEndpoint: "https://hasura-3udj.onrender.com/v1/graphql",
    wsEndpoint: 'wss://hasura-3udj.onrender.com/v1/graphql',
    httpLinkOptions: {
      headers: {
        'x-hasura-admin-secret': "soupnazi"
      }
    }
  }
}
