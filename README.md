# Old-Disnety-ATC-Script

No longer works due to changes to the Disney Website, however is a great display of how to create an automatic add to cart function for a wesbite with very basic security. Most low traffic online stores' only major security is a CSRF token, this program uses cheerio to scrape the token and cookieJar to store the necassary cookies to make a request to add an item to your cart. It then logs a checkout URL to the console. This program can be used in combination with threading to gain a strong advantage over a manual user during a limited release drop.

 
 ## How does it work??
 
 - ```const pid = '460021590933'``` This is the product ID of the item you would like to attempt to checkout. This can be found on the product page and is labelled as ```Item No```: 
 <img width="1440" alt="Screenshot 2022-10-03 at 16 01 58" src="https://user-images.githubusercontent.com/86264161/193668479-ff91c4e0-7744-4e65-b45c-5f11624fb360.png">


- ```async function csrfToken()``` Fetches the CSRF (a security token) throught the use of cheerio, it loads the page and scrapes it from the html. This token is required to make a request to add the item to cart.

- ```cookieUse = cookieJar.getCookieString(`https://www.shopdisney.co.uk/${pid}.html?cgid=2000087`)``` The script also makes use of cookiejar, to scrape all of the cookies needed for a request to be sent along with the csrf token to make an add to cart request.

- ```async function atc(token, cookieUse)``` The CSRF function then calls the add to cart function, which defines a POST method to send to the product URL to add the item to your cart. The function checks for errors, and retries if needed. Once successful, the program will log a checkout URL to the console. Alternatively, you could have this link logged to a discord webhook or sent via textmessage.
