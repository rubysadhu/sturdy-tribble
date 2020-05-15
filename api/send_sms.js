const accountSid = 'ACfe59a083beab96197347e43a1c7652d6';
const authToken = '3ff5e19d05443ac401e649c697e070de';
const client = require('twilio')(accountSid, authToken);


module.exports = ( req, res ) => {
  client.messages
    .create({
       body: `Does this work. Serverless Function.`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(message => res.json( message ))
};
