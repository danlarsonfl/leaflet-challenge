var mymap = L.map('mapid').setView([0, 0], 2);

const earth_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFubGFyc29uIiwiYSI6ImNrcGdjc3N4aTA2YmMyd2xpYXg5bTNkZTUifQ.VexVkgN5EJztVfL_LuiS7A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);





// };

// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(mymap);

async function getISS(){
const response = await fetch(earth_url);
// console.log(response);
const data = await response.json();
console.log(data['features'][0]['geometry']['coordinates'][0]);
console.log(data['features'][0]['geometry']['coordinates'][1]);
console.log(data['features'][0]['geometry']['coordinates'][2]);
console.log(data['features'].length)

// var long = data['features'][0]['geometry']['coordinates'][0];
// var lat = data['features'][0]['geometry']['coordinates'][1];
// var depth = data['features'][0]['geometry']['coordinates'][2];


// var circle = L.circle([lat, long], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);

data['features'].forEach(q => {
    let longg = q['geometry']['coordinates'][0];
    let lat = q['geometry']['coordinates'][1];
    let depth = q['geometry']['coordinates'][2];
    let mag = q['properties']['mag'];
    let title = q['properties']['title'];

    if (depth > 100) {
        colors = '#04fc2b';
      } else if (depth > 80) {
        colors = '#9ce400';
      } else if (depth > 70) {
        colors = '#d2c900';
      } else if (depth > 50) {
        colors = '#f4ad00';
      } else if (depth > 30) {
        colors = '#ff912e';
      } else if (depth > 10) {
        colors = '#ff7b56';
      } else {
        colors = '#fa6e76';
      }

    
      let qRadius = mag*10000;
      console.log(qRadius);

var circle = L.circle([lat, longg], {
    color: colors,
    fillColor: colors,
    fillOpacity: 0.5,
    radius: qRadius,
}).addTo(mymap);

circle.bindPopup('I am a '+mag+ ' magnitude earthquake.<br>'+title);



    // console.log(long['properties']['mag']);

    // console.log(long['geometry']['coordinates'][0]);
    // console.log(long['geometry']['coordinates'][1]);
    // console.log(long['geometry']['coordinates'][2]);
})




};

getISS();

//Get Colors

// function getColor(d) {
//     return d > 100 ? '#800026' :
//            d > 80  ? '#BD0026' :
//            d > 70  ? '#E31A1C' :
//            d > 50  ? '#FC4E2A' :
//            d > 30   ? '#FD8D3C' :
//            d > 10   ? '#FEB24C' :
//            d > 0   ? '#FED976' :
//                       '#FFEDA0';
// }

// //Set Stle

// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.density),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// L.geoJson(statesData, {style: style}).addTo(map);


// // Click Functions

// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }

// function resetHighlight(e) {
//     geojson.resetStyle(e.target);
// }



// ////

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);