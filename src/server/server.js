const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const port = 4000
// app.get('/',(req,res)=>{
//     res.sendFile('./dist/index.html')
// })
app.use(express.static('dist'))
const server = app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})
// set up form submit data
app.post("/form",(req,res)=>{
    // console.log(req.url)
    console.log(req.body)
    form_submit_data["travel_from"]=req.body['travel-from']
    form_submit_data["travel_to"]=req.body['travel-to']
    form_submit_data["travel_depart"]=req.body['travel-depart']
    form_submit_data["travel_return"]=req.body['travel-returns']
    console.log(form_submit_data)
    res.end("server has recieved form data")
    
})
// api keys
const apiKeys = {
    api_key_geo:"ardeshir",
    api_key_weatherbit:"00d059bd2cfe43f4b72bd15204c392f4",
    api_key_pixabay:"19047406-4088c00f011e020a9d4ae2608"

}

// form submit data to store
let form_submit_data = {}