let request = require("request-promise");
const cheerio = require('cheerio');
const cookieJar = request.jar();
request = request.defaults({ jar: cookieJar })
const fs = require('fs');


const pid = '460021590933'

csrfToken()
 


async function csrfToken(){
    data = await request.get(`https://www.shopdisney.co.uk/${pid}.html?cgid=2000087`)
    cookieUse = cookieJar.getCookieString(`https://www.shopdisney.co.uk/${pid}.html?cgid=2000087`)
    var $ = cheerio.load(data.toString());
    token =  $('[name=csrf_token]').val()
    cart = await request.get('https://www.shopdisney.co.uk/bag')
    k = cheerio.load(cart.toString());
    atc(token, cookieUse)
}

async function atc(token, cookieUse){
var options = {
  'method': 'POST',
  'url': 'https://www.shopdisney.co.uk/on/demandware.store/Sites-disneyuk-Site/en_GB/Cart-AddProduct',
  'headers': {
    'authority': 'www.shopdisney.co.uk',
    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    'accept': '*/*',
    'x-requested-with': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.shopdisney.co.uk',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': `https://www.shopdisney.co.uk/${pid}.html?cgid=2000087`,
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'cookie': cookieUse
  },
  body: `format=ajax&Quantity=1&pid=${pid}&csrf_token=${token}`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  try{
    try{
  message = JSON.parse(response.body).tokenMessage 
  if(message == 'product.addtocart.invalid_token'){
    console.log('Error adding to cart, invalid token, retrying!')
    atc(token, cookieUse)
    return;
  } }catch{}if(response.statusCode != 200){
      console.log('Error adding to cart, retrying!')
      atc(token, cookieUse)
    return;}
  else{
    console.log('Add to cart successful')
    console.log(body.url)
  }
  }catch{}
});}