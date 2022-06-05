const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const PORT = process.env.PORT || 5000
const XGET = app.get.bind(app)
const XPOST = app.post.bind(app)
const XUSE = app.use.bind(app)
const q = {
  textpro: {
    'pornhub': 'https://textpro.me/pornhub-style-logo-online-generator-free-977.html'
  },
  photooxy: {
    'neon': 'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html'
  }
}

async function getUrl($, config = { text2: false, url: '', textpro: true }) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  const url = config.url
  let result = ''

  await page
    .goto(url, { waitUntil: "networkidle2" })
    .then(async () => {
       await page.type("#text-0", $.text)
       if (config?.text2)
         await page.type("#text-1", $.text2)
       await page.click("#submit")
       await new Promise(resolve => setTimeout(resolve, 3000))
       const element = await page.$('div[class="btn-group"] > a')
       result = await (await element.getProperty("href")).jsonValue()
       browser.close()
    })
    .catch(err => console.log(err))
  return result
}
function sendData ($, content) {
  $.end(JSON.stringify(content, null, 2))
  //$.send(content)
}

app.use(bodyParser.json())
XGET('/', (req, res, next) => {
  sendData(res.status(503), {
    message: "Tidak ada layanan apapun disini, butuh pertolongan?",
    author: {
      wa: "wa.me/6285867400659",
      email: "silent7@itxteam.or.id"
    }
  })
})
XGET('/pornhub', async (req, res, next) => {
  const { text, text2 } = req?.query
  const unexq = Object.keys(req?.query || {}).filter(e => e !== 'text' && e !== 'text2')
  const getPath = req.path.slice(1) 
  let result = {}

  if (unexq.length > 0)
    return sendData(res.status(400), {
      status: "Bad request",
      code: 400,
      message: `Query { ${unexq.join(', ')} } tidak diharapkan!`
    })
  if (!text)
    result = {
      status: "Bad request",
      code: 400,
      message: "Textnya mana?"
    }
  else if (!text2)
    result = {
      status: "Bad request",
      code: 400,
      message: "Text2 nya mana?"
    }
  else if (text && text2)
    result = {
      status: "Ok",
      code: 200,
      message: "Nih pornhubnya!",
      data: { url: await getUrl(req.query, { text2: true, url: q.textpro[getPath] }) }
    }

  return sendData(text && text2 ? res : res.status(400), result)
})
XGET('/neon', async (req, res, next) => {
  const { text } = req?.query
  const unexq = Object.keys(req?.query || {}).filter(e => e !== 'text')
  const getPath = req.path.slice(1) 
  let result = {}

  if (unexq.length > 0)
    return sendData(res.status(400), {
      status: "Bad request",
      code: 400,
      message: `Query { ${unexq.join(', ')} } tidak diharapkan!`
    })
  if (!text)
    result = {
      status: "Bad request",
      code: 400,
      message: "Textnya mana?"
    }
  else if (text)
    result = {
      status: "Ok",
      code: 200,
      message: "Nih neonnya!",
      data: { url: await getUrl(req.query, { text2: true, url: q.photooxy[getPath] }) }
    }

  return sendData(text ? res : res.status(400), result)
})
XUSE((req, res, next) => {
  sendData(res.status(404), {
    status: "Not found",
    code: 404,
    message: "Halaman tidak ditemukan/tersedia!"
  })
})

app.listen(PORT, () => console.log('App listen on: %s', PORT))
