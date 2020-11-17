async function fetchFormData(data){
  const response = await fetch("/formdata",{
      method: "POST",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json"
      },        
      body:JSON.stringify(data)
  })
  return response.json()
}

async function getWeather(lon,lat){
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
      body: JSON.stringify({"lat":lat,"lon":lon}) // body data type must match "Content-Type" header
  })
  return response.json()
}

async function getPicture(){
  const imgElement = document.querySelector(".images")
  const response = await fetch("/picture")
  const url = await response.json()
  await imgElement.setAttribute("style",`background-image:url("${url[0]}")`)

  
}

function calculateDaysDifference(day1,day2){
  const dateOne = new Date(day1)
  const dateTwo = new Date(day2)
  const differenceTime = dateTwo.getTime()- dateOne.getTime()
  const differenceDays = differenceTime/ (1000 * 3600 * 24)
  return differenceDays

}

function updateGui(array_of_data){
  const weatherElement = document.querySelector("#weather")
  const countryElement = document.querySelector("#country")
  const capitalElement = document.querySelector("#capital")
  const populationElement = document.querySelector("#population")
  const currencyElement = document.querySelector("#currency")
  const languageElement = document.querySelector("#language")
  weatherElement.innerHTML = array_of_data[0]
  countryElement.innerHTML = array_of_data[1]
  capitalElement.innerHTML = array_of_data[2]
  populationElement.innerHTML = array_of_data[3]
  currencyElement.innerHTML = array_of_data[5]
  languageElement.innerHTML = array_of_data[4]
  
  
  }




export {fetchFormData,getWeather,getPicture,calculateDaysDifference,updateGui}