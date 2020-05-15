const twilioClient = require('twilio')('ACfe59a083beab96197347e43a1c7652d6', '3ff5e19d05443ac401e649c697e070de');

module.exports = ( req, res ) => {
  const order_id = req.query.order_id
  twilioClient.messages
    .create({
       body: `Get order id: ${order_id}`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(message => res.json( message ))
};
