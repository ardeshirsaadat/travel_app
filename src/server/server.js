const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const port = 5000
// app.get('/',(req,res)=>{
//     res.sendFile('./dist/index.html')
// })
app.use(express.static('dist'))
const server = app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})
// set up form submit data
app.post("/formdata",(req,res)=>{
    // console.log(req.url)
    console.log(req.body)
    // form_submit_data["travel_from"]=req.body['travel-from']
    // form_submit_data["travel_to"]=req.body['travel-to']
    // form_submit_data["travel_depart"]=req.body['travel-depart']
    // form_submit_data["travel_return"]=req.body['travel-returns']
    
    
})
// api keys
const apiKeys = {
    api_key_geo:"ardeshir",
    api_key_weatherbit:"00d059bd2cfe43f4b72bd15204c392f4",
    api_key_pixabay:"19047406-4088c00f011e020a9d4ae2608"

}

// form submit data to store
let form_submit_data = {}

// set up get route for longlat function
app.get("/longlat",async (req,res)=>{
    console.log("im server trying get api ")
    // const city_to_get = form_submit_data['travel_to'].charAt(0).tuUpperCase()+form_submit_data.travel_to.slice(1)
    const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${form_submit_data.travel_to}&maxRows=10&username=${apiKeys.api_key_geo}`)
    const data =await response.json()
    const lng = data["postalCodes"][0]["lng"]
    const lat = data["postalCodes"][0]["lat"]
    console.log(lng,lat)
    res.send(lng,lat)

})