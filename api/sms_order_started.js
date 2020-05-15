const twilioClient = require('twilio')(TWILIO_ACCOUNTSID, TWILIO_AUTHTOKEN);

module.exports = ( req, res ) => {
  twilioClient.messages
    .create({
       body: `Does this work. Serverless Function.`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(message => res.json( message ))
};
