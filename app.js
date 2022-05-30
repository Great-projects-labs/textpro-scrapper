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

app.get('/', function(req, res) {
  res.send('Internal error')
})
app.get('/pornhub', function(req, res) {
  const text = req.query.text
  const text2 = req.query.text2

  async function test($) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    const url = "https://textpro.me/pornhub-style-logo-online-generator-free-977.html"
    const result = {}
    function sendResult (content) { $.end(JSON.stringify(content, null, 2)) }
    
    if (Object.keys(req.query).filter(e => e !== 'text' || e !== 'text2').length > 0) {
      sendResult({ status: "bad request", message: "query yang tidak diharapkan!" })
      return
    }
    if (!text) {
      sendResult({ status: "bad request", message: "text nya mana?" })
      return
    }
    if (!text2) {
      sendResult({ status: "bad request", message: "text2 nya mana?" })
      return
    }
    
    await page
      .goto(url, { waitUntil: "networkidle2" })
      .then(async () => {
	 await page.type("#text-0", 'code')
         await page.type("#text-1", 'hub')
         await page.click("#submit")
         await new Promise(resolve => setTimeout(resolve, 3000))
	 const element = await page.$(
           'div[class="btn-group"] > a'
         );
	 const url_result = await (await element.getProperty("href")).jsonValue()
         result.status = "ok"
         result.code = 200
         result.result = { url: url_result }
	 sendResult(result)
	 browser.close();
      })
      .catch(err => console.log(err))
  }
  test(res).catch(console.error)
});

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))
