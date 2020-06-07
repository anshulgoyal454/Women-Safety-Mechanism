const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'b5b8b298',
  apiSecret: '7dlD77kOibsNrbvY',
});

const from = 'anshul';
const to = '919131415939';
const text = 'Women in need near you!!.. https://www.google.com/maps/search/?api=1&query=8.139,7.2090';

nexmo.message.sendSms(from, to, text);









//https://dashboard.nexmo.com/test-numbers