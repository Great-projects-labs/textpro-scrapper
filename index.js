const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/api', (req, res) => {
    res.json([
        { name: 'iPhone', price: 800 },
        { name: 'iPad', price: 650 },
        { name: 'iWatch', price: 750 }
    ])
})

app.listen(PORT, () => {
    console.log('server is listening on port 5000')
})
