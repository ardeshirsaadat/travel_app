import {fetchFormData,getWeather,getPicture,calculateDaysDifference,updateGui} from "./fetchFormData"
const submitevent = document.querySelector('#submit')
let today = new Date()
submitevent.addEventListener('click',testFunction)

function testFunction(event){
    event.preventDefault()
    console.log("im here")
    const travelFrom = document.querySelector("#travel-from").value
    const travelTo = document.querySelector("#travel-to").value
    const travelDepart = document.querySelector("#travel-depart").value
    const travelReturn = document.querySelector("#travel-return").value
    // calculate days to departure
    // console.log(calculateDaysToDeparture(travelDepart))
    const daysLeft = Math.round(calculateDaysDifference(today,travelDepart))
    const durationOfTrip = Math.round(calculateDaysDifference(travelDepart,travelReturn))
    
    document.querySelector("#departure").innerHTML = daysLeft
    document.querySelector("#duration").innerHTML = durationOfTrip 
    // fetch data form-data to server
    const formData = {"travel_from":travelFrom,"travel_to":travelTo,"travel_depart":travelDepart,"travel_return":travelReturn,"days_left_to_departure":daysLeft}
    // call fetchfromdata function
    fetchFormData(formData).then(res=>{
        getWeather(res[0],res[1]).then(res=>{
            updateGui(res)
        }).catch(error=>{
            console.log('destination not found')
        })
    })
    getPicture().catch(error=>{
        console.log("picture of your destination is not found")
    })

    
}

// fetch form data function



export {testFunction}