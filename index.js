const puppeteer = require('puppeteer')
const app = require('express')
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send(JSON.stringify({
    status: "ok",
    code: 200,
    message: "already to use"
  }, null, 2))
})
app.listen(PORT, () => console.log('App listen on PORT: %s', PORT))
