const accountSid = 'ACfe59a083beab96197347e43a1c7652d6';
const authToken = '3ff5e19d05443ac401e649c697e070de';
const twilio = require('twilio');

const client = new twilio(accountSid, authToken);

client.messages
  .create({
     body: `Thank you for your pickup order.

You will get a text message that says you're order is confirmed and another message when your order is ready for pickup.

Your Order:

https://soupchef.com/order/1092

- 1 Poutine
- 2 Homemade Gravy
- 1 Angry Jay Burger

Total: $27.18
* HST Included

Directions:

4574 Bath Rd,
Amherstview, Ontario

Pick Up Time:

In 45 Minutes (1:30-45pm)

See you @ the truck!

Mannete - SoupChef`,
     from: '+15878017440',
     to: '+16474068748'
   })
  .then(message => console.log(message.sid));
console.log('hey')
