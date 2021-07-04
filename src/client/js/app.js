const results = {};
//--------APIs--------- 
const geonameURL = 'http://api.geonames.org/searchJSON?q=';  
const username = 'abdulrahmanabdullah';
const weatherbitForecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'; 
const weatherbitKey = "&key=acd54bf71d3041a2ae88d50d54a0e701";                   
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = '19509407-dd54dff4cf9335069c1d70315';

//--------assignment Id--------- 
const planTrip = document.getElementById("planner");
const result = document.getElementById("result");
const saveTrip = document.querySelector(".save");
const deleteTrip = document.querySelector(".delete");
const submitTrip = document.querySelector("#submit");

//---------add Your Trip---------
document.addEventListener("DOMContentLoaded", function () {
const addYourTrip = document.getElementById("addYourTribBtn").addEventListener('click',function(e){
    e.preventDefault();
    planTrip.scrollIntoView({ behavior: 'smooth' });
 });
});

//---------Save The Trip---------
document.addEventListener("DOMContentLoaded", function () {
saveTrip.addEventListener('click', function (e) {
    e.preventDefault();
    window.print();
    location.reload();
  });
});

 //---------delete The Trip---------
 document.addEventListener("DOMContentLoaded", function () {

 deleteTrip.addEventListener('click',function(e){
    e.preventDefault();
    result.classList.add('invisible');
  //  location.reload(); // reloads the current URL, like the Refresh button
 });
});

 //---------submit The Trip---------
document.addEventListener("DOMContentLoaded", function () {
submitTrip.addEventListener('click',addTrip);
});

 function addTrip(e){
    e.preventDefault();
  
    results['fromCity'] = document.getElementById('from').value;
    results['toCity'] = document.getElementById('to').value;
    results['date'] = document.getElementById('dateinput').value;
   // console.log(results)

    getCityLatLan(results['to'])
    
    .then(function (geonameData){
        const lat = geonameData.geonames[0].lat;
        const lng = geonameData.geonames[0].lng;
      //  console.log(lat +" &"+ lng)
        return  getWeatherbitData(lat,lng) 
    })
 

    .then (function (weatherbitData){
       // console.log(weatherbitData)
        results['temp'] = weatherbitData.data[0].temp;
        results['weatherCondition'] =  weatherbitData.data[0].weather.description; 
       // console.log(  results['temp']  + "-"+ results['weatherCondition']) 

      // retrun the City image from Pixabay API
         return getPixabayImage(results['toCity'])
    })

    .then(function (imageData){
      // store the City image to rsults obj  
     results['image'] = imageData;  
   })
    
   .then ( function (resultsData){
       // send the results information into server to soring
       return postData(results)
   })

    .then((data) => {
        //receving and showing the information 
         updateUI(data);
    }) 
}// end addTrip

//--------fetching geoname API--------- 
const getCityLatLan = async(to)=>{
       
     try{
        const res = await fetch(geonameURL + to  +'&username=' + username ) 
        const data = await res.json();
        return data;
     }catch(error){
         console.log("error", error.message)
     }
}//end getCityLatLan

//--------fetching weatherbit API--------- 
const getWeatherbitData = async(lat,lng)=>{ 

    const res = await fetch(weatherbitForecastURL + '&lat=' + lat + '&lon=' + lng + weatherbitKey) 
     try{
        const data = await res.json();
        return data;
     }catch(error){
         console.log("error",error)
     }
}//end getWeatherLatLan

//--------fetching pixabay API--------- 
const getPixabayImage = async (to) =>{
   
    const res = await fetch(pixabayURL + pixabayKey + "&q=" + to + "&image_type=photo") 

    try{
        const data = await res.json();
        const imageData =data.hits[0].webformatURL;
        console.log(data.hits[0]);
        return imageData;
     }catch(error){
         console.log("error",error)
     }
}//end getPixabayImage

//post
  async function postData(results) {
    const response = await fetch('http://localhost:3031/addData', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(results)
    });

    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}


  //Dynamically Update UI Demo
  function updateUI (data){

        result.classList.remove("invisible")
        result.scrollIntoView({ behavior: "smooth" });

        document.getElementById('fromCity').innerHTML = data.fromCity;
        document.getElementById('toCity').innerHTML = data.toCity;
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('weatherCondition').innerHTML = data.weatherCondition;
        document.getElementById('image-result').setAttribute("src", data.image);
  }//end updateUI



export { addTrip }


