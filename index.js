const express = require('express')
const app = express()
const puppeteer = require('puppeteer')
const PORT = process.env.PORT || 5000
const XGET = app.get.bind(app)
const XPOST = app.post.bind(app)
const XUSE = app.use.bind(app)

async function getUrl($) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  const url = "https://textpro.me/pornhub-style-logo-online-generator-free-977.html"
  let result = ''

  await page
    .goto(url, { waitUntil: "networkidle2" })
    .then(async () => {
       await page.type("#text-0", $.text)
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
}

XGET('/', (req, res, next) => {
  sendData(res, {
    message: "Tidak ada layanan apapun disini, butuh pertolongan?",
    author: {
      wa: "wa.me/6285867400659",
      email: "silent7@itxteam.or.id"
    }
  })
})
XGET('/pornhub', (req, res, next) => {
  const { text, text2 } = req?.query
  const unexq = Object.keys(req?.query || {}).filter(e => e !== 'text' && e !== 'text2')
  let result = {}

  if (unexq.length > 0)
    return sendData(res, {
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
      data: { url: '' }
    }

  return sendData(res, result)
})
XUSE((req, res, next) => {
  sendData(res.status(404), {
    status: "Not found",
    code: 404,
    message: "Halaman tidak ditemukan/tersedia!"
  })
})

app.listen(PORT, () => console.log('App listen on: %s', PORT))
