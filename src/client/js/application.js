import {fetchFormData,getWeather,getPicture,calculateDaysToDeparture} from "./fetchFormData"


function testFunction(event){
    event.preventDefault()
    console.log("im here")
    const travelFrom = document.querySelector("#travel-from").value
    const travelTo = document.querySelector("#travel-to").value
    const travelDepart = document.querySelector("#travel-depart").value
    const travelReturn = document.querySelector("#travel-return").value
    // calculate days to departure
    // console.log(calculateDaysToDeparture(travelDepart))
    document.querySelector("h2").innerHTML = `${Math.round(calculateDaysToDeparture(travelDepart))} days`
    // fetch data form-data to server
    const formData = {"travel_from":travelFrom,"travel_to":travelTo,"travel_depart":travelDepart,"travel_return":travelReturn}
    // call fetchfromdata function
    fetchFormData(formData).then(res=>{
        getWeather(res[0],res[1]).then(res=>{console.log(res)})
    })
    getPicture()

    
}

// fetch form data function



export {testFunction}