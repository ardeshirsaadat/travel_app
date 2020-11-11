async function fetchFormData(data){
  const response = await fetch("/formdata",{
      method: "POST",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json"
      },        
      body:JSON.stringify(data)
  })
  // return response.json()
}
export {fetchFormData}