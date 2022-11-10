var map = L.map('map').setView([45.729191, 4.899902], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

}).addTo(map);

var iconimgurl = 'image/GreenMarker.png';

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
    localStorage.setItem('Fav'+i, i);
}

function delFav(i)
{
    localStorage.setItem('Fav'+i, i);
    localStorage.removeItem('Fav'+i)
}

function bike(xhttp) {
    const obj = JSON.parse(xhttp.response);
    console.log(obj);
    for (i=0 ; i<obj.length ; i++)
    {
    if (obj[i].available_bikes===0)
    {
        iconimgurl = 'image/RedMarker.png';
    }
    else if (localStorage.getItem('Fav'+i))
    {
        iconimgurl = 'image/etoile.png';
    }

    else
    {
        iconimgurl = 'image/GreenMarker.png';
    }
        var icon = L.icon
        ({
            iconUrl: iconimgurl,
            iconSize:     [20, 38], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        })

        marker = L.marker([obj[i].position.lat, obj[i].position.lng],{icon:icon}).addTo(map).bindPopup("  Adresse:"+obj[i].address+".  Vélo dispo:"+obj[i].available_bikes
            + "<button onclick=delFav("+ i +"),loadDoc(api,bike)>Supprimer FAV</button>"
            + "<button onclick=addFav("+ i +"),loadDoc(api,bike)>Ajouter FAV</button>");

    }


}





