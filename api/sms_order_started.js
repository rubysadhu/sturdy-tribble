const client = require('twilio')(process.env.twilio_accountSid, process.env.twilo_authToken);

module.exports = ( req, res ) => {
  client.messages
    .create({
       body: `Does this work. Serverless Function.`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(message => res.json( message ))
};
