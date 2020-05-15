const client = require('twilio')(TWILIO_ACCOUNTSID, TWILIO_AUTHTOKEN);

module.exports = ( req, res ) => {
  client.messages
    .create({
       body: `Does this work. Serverless Function.`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(message => res.json( message ))
};
