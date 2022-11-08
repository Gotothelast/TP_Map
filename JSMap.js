var map = L.map('map').setView([45.729191, 4.899902], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

}).addTo(map);

var YellowIcon = L.icon
({
    iconUrl: 'image/RedMarker.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
var api= "https://api.jcdecaux.com/vls/v1/stations?apiKey=e5cf20fe05e76267eaf0161b758ec0ea1179d0cb";

loadDoc(api,bike);

function loadDoc(url,cfunction) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {cfunction(this);}
    xhttp.open("GET", url);
    xhttp.send();


};


function bike(xhttp) {
    const obj = JSON.parse(xhttp.response);
    console.log(obj);
    for (i=0 ; i<obj.length ; i++)
    {
        if (obj[i].available_bikes>0)
        {
            var marker = L.marker([obj[i].position.lat, obj[i].position.lng],{icon:YellowIcon}).addTo(map).bindPopup("  Adresse:"+obj[i].address+".  Vélo dispo:"+obj[i].available_bikes+ "<button onclick=addFav("+ i +"),loadDoc(api,bike)>Print</button>");

        }
        if (localStorage.getItem('Fav' +i)==true)
            {
                console.log(localStorage.getItem('Fav' +i));

                var marker = L.marker([obj[i].position.lat, obj[i].position.lng],{icon:YellowIcon}).addTo(map).bindPopup("  Adresse:"+obj[i].address+".  Vélo dispo:"+obj[i].available_bikes+ "<button onclick=addFav("+ i +"),loadDoc(api,bike)>Print</button>");

            }

        else
            {
                var marker = L.marker([obj[i].position.lat, obj[i].position.lng]).addTo(map).bindPopup("  Adresse:" + obj[i].address + ".  Vélo dispo:" + obj[i].available_bikes + "<button onclick=addFav("+ i +")>Print</button>");
            }
    }
}

function addFav(i)
{
    localStorage.setItem('Fav' + i, i);
    console.log(localStorage.getItem('Fav' +i));
}




