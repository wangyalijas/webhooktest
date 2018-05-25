const express = require('express')
const app = express()
app.post('/webhook', (req, res) => console.log(req))
app.listen(3000, () => console.log('Example app listening on port 3000!'))