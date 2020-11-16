const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
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
app.post("/formdata",async (req,res)=>{
    // console.log(req.url)
    // console.log(req.body)
    form_submit_data["travel_from"]=req.body.travel_from
    form_submit_data["travel_to"]=req.body.travel_to
    form_submit_data["travel_depart"]=req.body.travel_depart
    form_submit_data["travel_return"]=req.body.travel_return
    form_submit_data["days_left_to_departure"] = req.body.days_left_to_departure
    const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${form_submit_data.travel_to}&maxRows=10&username=${apiKeys.api_key_geo}`)
    try{
    const data =await response.json()
    const lon = data["postalCodes"][0]["lng"]
    const lat = data["postalCodes"][0]["lat"]
    const country_code = data["postalCodes"][0]["countryCode"]
    // get country's code & store in server
    form_submit_data["country_code"] = country_code
    console.log(lon,lat)
    res.send([lon,lat])
    }
    catch(e){
        console.error(e)
        console.log("can not fetch data from api")
    }

    
})
// api keys
const apiKeys = {
    api_key_geo:process.env.api_key_geo,
    api_key_weatherbit:process.env.api_key_weatherbit,
    api_key_pixabay:process.env.api_key_pixabay

}

// form submit data to store
let form_submit_data = {}

// set up route to get temp from second api
app.post("/weather",async (req,res)=>{
    console.log("im server trying get api ")
    // const city_to_get = form_submit_data['travel_to'].charAt(0).tuUpperCase()+form_submit_data.travel_to.slice(1)
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKeys.api_key_weatherbit}&lat=${req.body.lat}&lon=${req.body.lon}`)
    const response2 = await fetch(`https://restcountries.eu/rest/v2/alpha/${form_submit_data.country_code}`)
    try{
    const data =await response.json()
    const data2 =await response2.json()
    
    // use rest parameter to extract all data elements
    const [...tmps] = data["data"]
    // define temp_list to extract all temp forcasts
    let general_info_list = []
    let temperature = tmps[0]['temp']
    let country = data2.name
    let capital = data2.capital
    let population = data2.population
    let language = data2.languages[0].name
    let currency = data2.currencies[0].name
    

    general_info_list.push(temperature)
    general_info_list.push(country)
    general_info_list.push(capital)
    general_info_list.push(population)
    general_info_list.push(language)
    general_info_list.push(currency)
    res.send(general_info_list)

    // if (form_submit_data.days_left_to_departure <= 7){
    //     temps_list = tmps[0]['temp']
    //     res.send([temps_list])
    // }
    // else{
    //     for (const {temp:n} of tmps){
            
    //         temps_list.push(n)
    //     }
    //     res.send(temps_list) 
    // }
}
catch(e){
    console.error(e)
    console.log("can not fetch data from api")
}
    
    

})
// set up route to get picture from third api
app.get("/picture",async (req,res)=>{
    try{
    const response = await fetch(`https://pixabay.com/api/?key=${apiKeys.api_key_pixabay}&q=${form_submit_data.travel_to}&image_type=photo&category=nature&per_page=3`)
    const data = await response.json()
    // in case entered location brings up no result look for country's pictures
    if (data["hits"] === 0){
        const response = await fetch(`https://pixabay.com/api/?key=${apiKeys.api_key_pixabay}&q=${form_submit_data.travel_to}&image_type=photo&category=nature&per_page=3`)
        const data = await response.json()
        const url = data["hits"][0]["largeImageURL"]
        console.log(url)
        res.send([url])
    }
    else{
        const url = data["hits"][0]["largeImageURL"]
        console.log(url)
        res.send([url])
    }
}
catch(e){
    console.error(e)
    console.log("can not fetch data from api")
}
    
    
})