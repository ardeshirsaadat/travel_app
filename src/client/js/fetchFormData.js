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
  const imgElement = document.querySelector("#img")
  const response = await fetch("/picture")
  const url = await response.json()
  await imgElement.setAttribute('src',url[0])

  
}




export {fetchFormData,getWeather,getPicture}