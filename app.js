const express = require('express')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const app = express()
const port = process.env.PORT || 5000

// Static Files
// app.use(express.static('public'))
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/img', express.static(__dirname + 'public/img'))
// app.use('/js', express.static(__dirname + 'public/js'))

// Templating Engine
// app.set('views', './src/views')
// app.set('view engine', 'ejs')

// app.use(bodyParser.urlencoded({ extended : true }))

// Routes
// const newsRouter = require('./src/routes/news')

// app.use('/', newsRouter)
// app.use('/article', newsRouter)

app.get('/', function(req, res){
  async function test () {
  const browser = await puppeteer.launch({
		headless: false,
	});
	const page = await browser.newPage();
	await page
	  .goto("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", {
				waitUntil: "networkidle2"
		})
		.then(async () => {
				await page.type("#text-0", 'code');
				await page.type("#text-1", 'hub');
				await page.click("#submit");
				await new Promise(resolve => setTimeout(resolve, 3000));
				const element = await page.$(
					'div[class="btn-group"] > a'
					);
				const url = await (await element.getProperty("href")).jsonValue();
				res.end(JSON.stringify({
				  response: {
				    url: url,
				    code: 200
				  }
				}, null, 2))
				browser.close();
		})
}

test.catch(console.error)
});

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
