const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 4000
// app.get('/',(req,res)=>{
//     res.sendFile('./dist/index.html')
// })
app.use(express.static('dist'))
const server = app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})

