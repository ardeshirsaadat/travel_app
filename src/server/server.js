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
app.post("/formdata",async (req,res)=>{
    // console.log(req.url)
    // console.log(req.body)
    form_submit_data["travel_from"]=req.body.travel_from
    form_submit_data["travel_to"]=req.body.travel_to
    form_submit_data["travel_depart"]=req.body.travel_depart
    form_submit_data["travel_return"]=req.body.travel_return
    const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${form_submit_data.travel_to}&maxRows=10&username=${apiKeys.api_key_geo}`)
    const data =await response.json()
    const lon = data["postalCodes"][0]["lng"]
    const lat = data["postalCodes"][0]["lat"]
    console.log(lon,lat)
    res.send([lon,lat])

    
})
// api keys
const apiKeys = {
    api_key_geo:"ardeshir",
    api_key_weatherbit:"00d059bd2cfe43f4b72bd15204c392f4",
    api_key_pixabay:"19047406-4088c00f011e020a9d4ae2608"

}

// form submit data to store
let form_submit_data = {}

// set up route to get temp from second api
app.post("/weather",async (req,res)=>{
    console.log("im server trying get api ")
    // const city_to_get = form_submit_data['travel_to'].charAt(0).tuUpperCase()+form_submit_data.travel_to.slice(1)
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKeys.api_key_weatherbit}&lat=${req.body.lat}&lon=${req.body.lon}`)
    const data =await response.json()
    const tmp = data["data"][0]["high_temp"]
    
    console.log(tmp)
    res.send([tmp])

})
// set up route to get picture from third api
app.get("/picture",async (req,res)=>{
    const response = await fetch(`https://pixabay.com/api/?key=${apiKeys.api_key_pixabay}&q=${form_submit_data.travel_to}&image_type=photo&category=nature&per_page=3`)
    const data = await response.json()
    
    const url = data["hits"][0]["largeImageURL"]
    console.log(url)
    res.send([url])
})