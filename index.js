const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey= "934e7a6e3782064c4f6b270fc6a0570b";

weatherform.addEventListener("submit", async event => {
  
    event.preventDefault();

    const city= cityInput.value;

    if(city)
        {
            try{
                const weatherData= await getweatherdata(city);
                displayweatherinfo(weatherData);
            }
            catch(error)
            {
                console.error(error);
                displayerror(error);
            }
        }
    else{
        displayerror("PLZ");
    }
});

async function getweatherdata(city)
{
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response=await fetch(apiUrl);
    console.log(response);
    if(!response.ok)
        {
            throw new Error("could not fetch data");
        }
        return await response.json();
}

function displayweatherinfo(data)
{
    const {name:city,main:{temp, humidity},weather:[{description,id}]}=data;
    card.textContent=" ";
    card.style.display="flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°c`;
    humidityDisplay.textContent=`Humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getweatheremoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("temDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);


    

}

function getweatheremoji(weatherid)
{
    switch(true)
    {
        case(weatherid>=200&&weatherid<300):
        return "⛈️";
        case(weatherid>=300&&weatherid<400):
        return "🌦️";
        case(weatherid>=500&&weatherid<600):
        return "🌧️";
        case(weatherid>=600&&weatherid<700):
        return "❄️";
        case(weatherid>=700&&weatherid<800):
        return "🌫️";
        case(weatherid==800):
        return "☀️";
        case(weatherid>=801&&weatherid<810):
        return "☁️";
        default:
            return "❓";
    }
}
function displayerror(message)
{
    const errorDispaly=document.createElement("p");
    errorDispaly.textContent=message;
    errorDispaly.classList.add("errorDisplay");

    card.textContent= " "  ;
    card.style.display="flex";
    card.appendChild(errorDispaly);
}