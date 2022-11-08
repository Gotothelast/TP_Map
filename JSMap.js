var map = L.map('map').setView([45.729191, 4.899902], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

}).addTo(map);

var iconimgurl = 'image/GreenMarker.png';
var RedIcon = L.icon
({
    iconUrl: 'image/RedMarker.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

var GreenIcon = L.icon
({
    iconUrl: 'image/GreenMarker.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
var api= "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=e5cf20fe05e76267eaf0161b758ec0ea1179d0cb";

loadDoc(api,bike);

function loadDoc(url,cfunction) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {cfunction(this);}
    xhttp.open("GET", url);
    xhttp.send();


};

function addFav(i)
{
    localStorage.setItem('Fav' + i, i);
    console.log(localStorage.getItem('Fav' + i));

}

function bike(xhttp) {
    const obj = JSON.parse(xhttp.response);
    console.log(obj);
    for (i=0 ; i<obj.length ; i++)
    {
if (localStorage.getItem('Fav' + i)===true)
{
    //Comparé la station actuelle dans le tableau avec le contenu du local storage
    // if Actuelle station in local storage :
    iconimgurl='image/etoile.png'

}
    if (obj[i].available_bikes===0)
    {
        iconimgurl = 'image/RedMarker.png';
    }
    else
    {
        iconimgurl = 'image/GreenMarker.png';
    }
        var icon = L.icon
        ({
            iconUrl: iconimgurl,
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })


            marker = L.marker([obj[i].position.lat, obj[i].position.lng],{icon:icon}).addTo(map).bindPopup("  Adresse:"+obj[i].address+".  Vélo dispo:"+obj[i].available_bikes+ "<button onclick=addFav("+ i +"),loadDoc(api,bike)>Print</button>");




    }
}





