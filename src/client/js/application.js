import {fetchFormData} from "./fetchFormData"


function testFunction(event){
    event.preventDefault()
    console.log("im here")
    const travelFrom = document.querySelector("#travel-from").value
    const travelTo = document.querySelector("#travel-to").value
    const travelDepart = document.querySelector("#travel-depart").value
    const travelReturn = document.querySelector("#travel-return").value
    console.log(travelFrom,travelTo,travelDepart,travelReturn)
    // fetch data form-data to server
    const formData = {"travel_from":travelFrom,"travel_to":travelTo,"travel_depart":travelDepart,"travel_return":travelReturn}
    // call fetchfromdata function
    fetchFormData(formData)


    
}
const getweather = async(long,lat)=>{
    const response = await fetch("/weather",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(long,lat) // body data type must match "Content-Type" header
    })
    return response.json()
}

// fetch form data function



export {testFunction}