const accountSid = 'ACfe59a083beab96197347e43a1c7652d6';
const authToken = '1b7154c576de00d23b38f70e15643ab0';
const client = require('twilio')(accountSid, authToken);


module.exports = ( req, res ) => {
  client.messages
    .create({
       body: `Does this work. Serverless Function.`,
       from: '+15878017440',
       to: '+16474068748'
     })
    .then(function(err, messages) {
      console.log(err, messages.sid)
      res.json( messages )
    });
};
