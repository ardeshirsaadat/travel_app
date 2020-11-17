// import 'regenerator-runtime/runtime';
import "./styles/styles.scss"
// import "./js/application.js"
import {testFunction} from './js/application'
// import {fetchFormData,getWeather,getPicture,calculateDaysDifference,updateGui} from './js/fetchFormData'

const submitevent = document.querySelector('#submit')


submitevent.addEventListener('click',testFunction)
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

// export{testFunction,fetchFormData,getWeather,getPicture,calculateDaysDifference,updateGui}
// export{testFunction}
